import os
import secrets
import time
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

from fastapi import Depends, FastAPI, File, Form, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

import models
import schemas
from ai import DEPARTMENTS, SLA_HOURS, classify
from auth import UserOut, get_current_user, hash_password, require_roles
from auth import router as auth_router
from database import Base, SessionLocal, engine, get_db

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
MAX_PHOTO = 5 * 1024 * 1024  # Claude accepts images up to 5 MB
IMAGE_TYPES = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}


def seed_admin():
    """Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD in .env (once)."""
    email, pw = os.getenv("ADMIN_EMAIL"), os.getenv("ADMIN_PASSWORD")
    if not (email and pw):
        return
    db = SessionLocal()
    try:
        if not db.query(models.User).filter(models.User.email == email.lower()).first():
            db.add(models.User(full_name="Administrator", email=email.lower(),
                               hashed_password=hash_password(pw), role="admin"))
            db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed_admin()
    yield


app = FastAPI(title="Smart Civic Issue Management", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","),
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth_router)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


def to_out(i: models.Issue) -> schemas.IssueOut:
    return schemas.IssueOut(
        id=i.id, ticket=i.ticket, description=i.description or "", location=i.location,
        lat=i.lat, lng=i.lng, photo_url=f"/uploads/{i.photo}" if i.photo else None,
        dept=i.dept, department=DEPARTMENTS.get(i.dept, i.dept), priority=i.priority,
        confidence=i.confidence or 0, summary=i.summary or "", ai_source=i.ai_source or "",
        status=i.status, reporter=i.reporter.full_name if i.reporter else "Citizen",
        created_at=i.created_at, due_at=i.due_at, resolved_at=i.resolved_at)


def scoped(q, user: models.User):
    """Officers only ever see their own department's issues."""
    return q.filter(models.Issue.dept == user.department) if user.role == "officer" else q


def to_float(v: str):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


@app.get("/")
def root():
    return {"app": "Smart Civic Issue Management", "docs": "/docs"}


@app.get("/departments")
def departments():
    return [{"key": k, "name": v} for k, v in DEPARTMENTS.items()]


# ---------- citizens ----------
@app.post("/issues", response_model=schemas.IssueOut, status_code=201)
def create_issue(
    location: str = Form(...),
    description: str = Form(""),
    lat: str = Form(""),
    lng: str = Form(""),
    photo: UploadFile | None = File(None),
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    description, location = description.strip()[:2000], location.strip()[:300]
    if not location:
        raise HTTPException(400, "Add where the problem is")
    data, mime, filename = None, None, None
    if photo and photo.filename:
        if photo.content_type not in IMAGE_TYPES:
            raise HTTPException(400, "Photo must be a JPG, PNG, WebP or GIF image")
        data = photo.file.read(MAX_PHOTO + 1)
        if len(data) > MAX_PHOTO:
            raise HTTPException(400, "Photo is larger than 5 MB")
        mime = photo.content_type
        filename = secrets.token_hex(16) + IMAGE_TYPES[mime]
        (UPLOAD_DIR / filename).write_bytes(data)
    if not description and not data:
        raise HTTPException(400, "Add a photo or describe the problem")

    ai = classify(description, data, mime)          # <- the AI routing step
    now = int(time.time() * 1000)
    issue = models.Issue(
        ticket=f"CIV-{now:X}{secrets.randbelow(900) + 100}", description=description,
        location=location, lat=to_float(lat), lng=to_float(lng), photo=filename,
        reporter_id=user.id, dept=ai["dept"], priority=ai["priority"], confidence=ai["confidence"],
        summary=ai["summary"], ai_source=ai["source"], status="Assigned",
        created_at=now, due_at=now + SLA_HOURS[ai["priority"]] * 3_600_000)
    db.add(issue)
    db.commit()
    db.refresh(issue)
    print(f"[notify] {DEPARTMENTS[issue.dept]}: {issue.priority} priority {issue.ticket}")  # plug email/SMS here
    return to_out(issue)


@app.get("/issues/mine", response_model=list[schemas.IssueOut])
def my_issues(user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.query(models.Issue).filter(models.Issue.reporter_id == user.id).order_by(models.Issue.created_at.desc()).all()
    return [to_out(r) for r in rows]


@app.get("/track/{ticket}", response_model=schemas.TrackOut)
def track(ticket: str, db: Session = Depends(get_db)):
    i = db.query(models.Issue).filter(models.Issue.ticket == ticket.upper()).first()
    if not i:
        raise HTTPException(404, "No report with that ID")
    return schemas.TrackOut(ticket=i.ticket, department=DEPARTMENTS.get(i.dept, i.dept), priority=i.priority,
                            status=i.status, summary=i.summary or "", created_at=i.created_at,
                            due_at=i.due_at, resolved_at=i.resolved_at)


# ---------- officers and admins ----------
@app.get("/issues", response_model=list[schemas.IssueOut])
def list_issues(
    dept: str | None = Query(None), status: str | None = Query(None),
    user: models.User = Depends(require_roles("officer", "admin")), db: Session = Depends(get_db),
):
    q = scoped(db.query(models.Issue), user)
    if dept:
        q = q.filter(models.Issue.dept == dept)
    if status:
        q = q.filter(models.Issue.status == status)
    return [to_out(r) for r in q.order_by(models.Issue.created_at.desc()).limit(500).all()]


@app.patch("/issues/{issue_id}", response_model=schemas.IssueOut)
def update_issue(
    issue_id: int, data: schemas.IssueUpdate,
    user: models.User = Depends(require_roles("officer", "admin")), db: Session = Depends(get_db),
):
    issue = scoped(db.query(models.Issue), user).filter(models.Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(404, "Issue not found")
    if data.dept:
        if data.dept not in DEPARTMENTS:
            raise HTTPException(400, "Unknown department")
        issue.dept = data.dept
    if data.status:
        issue.status = data.status
        issue.resolved_at = (issue.resolved_at or int(time.time() * 1000)) if data.status == "Resolved" else None
    db.commit()
    db.refresh(issue)
    return to_out(issue)


@app.get("/stats")
def stats(user: models.User = Depends(require_roles("officer", "admin")), db: Session = Depends(get_db)):
    now = int(time.time() * 1000)
    rows = scoped(db.query(models.Issue), user).all()
    open_rows = [r for r in rows if r.status != "Resolved"]
    by_dept: dict[str, int] = {}
    for r in open_rows:
        by_dept[r.dept] = by_dept.get(r.dept, 0) + 1
    return {"total": len(rows), "open": len(open_rows),
            "high_priority": sum(r.priority == "High" for r in open_rows),
            "overdue": sum(r.due_at < now for r in open_rows),
            "by_department": [{"dept": k, "name": DEPARTMENTS.get(k, k), "open": v} for k, v in by_dept.items()]}


@app.post("/admin/users", response_model=UserOut, status_code=201)
def create_staff(data: schemas.StaffCreate, _: models.User = Depends(require_roles("admin")), db: Session = Depends(get_db)):
    if data.role == "officer" and data.department not in DEPARTMENTS:
        raise HTTPException(400, "Officers need a valid department key")
    if db.query(models.User).filter(models.User.email == data.email.lower()).first():
        raise HTTPException(409, "An account with this email already exists")
    u = models.User(full_name=data.full_name.strip(), email=data.email.lower(),
                    hashed_password=hash_password(data.password), role=data.role,
                    department=data.department if data.role == "officer" else None)
    db.add(u)
    db.commit()
    db.refresh(u)
    return 