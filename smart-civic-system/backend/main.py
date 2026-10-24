from fastapi import FastAPI, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import os
import shutil

from database import engine, get_db
from database import Base

from models import Issue


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Smart Civic Issue Management System",
    version="1.0"
)


# Allow React frontend
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Create upload directory
os.makedirs("uploads", exist_ok=True)


@app.get("/")
def home():

    return {
        "message": "Smart Civic Issue Management API",
        "status": "running"
    }


# --------------------------------------------------
# CREATE ISSUE
# --------------------------------------------------

@app.post("/issues")
async def create_issue(

    category: str = Form(...),

    description: str = Form(...),

    latitude: float = Form(...),

    longitude: float = Form(...),

    severity: str = Form("medium"),

    image: UploadFile | None = File(None),

    db: Session = Depends(get_db)

):

    image_path = None

    if image:

        filename = image.filename

        image_path = f"uploads/{filename}"

        with open(image_path, "wb") as buffer:

            shutil.copyfileobj(
                image.file,
                buffer
            )


    issue = Issue(

        category=category,

        description=description,

        latitude=latitude,

        longitude=longitude,

        image_path=image_path,

        severity=severity,

        status="submitted"

    )


    db.add(issue)

    db.commit()

    db.refresh(issue)


    return {

        "message": "Civic issue submitted successfully",

        "issue_id": issue.id,

        "category": issue.category,

        "status": issue.status

    }


# --------------------------------------------------
# GET ALL ISSUES
# --------------------------------------------------

@app.get("/issues")
def get_issues(
    db: Session = Depends(get_db)
):

    issues = db.query(Issue).all()

    return issues


# --------------------------------------------------
# GET SINGLE ISSUE
# --------------------------------------------------

@app.get("/issues/{issue_id}")
def get_issue(

    issue_id: int,

    db: Session = Depends(get_db)

):

    issue = db.query(Issue).filter(
        Issue.id == issue_id
    ).first()


    if not issue:

        return {
            "error": "Issue not found"
        }


    return issue


# --------------------------------------------------
# UPDATE STATUS
# --------------------------------------------------

@app.put("/issues/{issue_id}/status")
def update_status(

    issue_id: int,

    status: str,

    db: Session = Depends(get_db)

):

    issue = db.query(Issue).filter(
        Issue.id == issue_id
    ).first()


    if not issue:

        return {
            "error": "Issue not found"
        }


    issue.status = status

    db.commit()

    db.refresh(issue)


    return {

        "message": "Status updated",

        "issue_id": issue.id,

        "status": issue.status

    }


# --------------------------------------------------
# ASSIGN DEPARTMENT
# --------------------------------------------------

@app.put("/issues/{issue_id}/assign")
def assign_department(

    issue_id: int,

    department: str,

    db: Session = Depends(get_db)

):

    issue = db.query(Issue).filter(
        Issue.id == issue_id
    ).first()


    if not issue:

        return {
            "error": "Issue not found"
        }


    issue.department = department

    issue.status = "assigned"

    db.commit()

    db.refresh(issue)


    return {

        "message": "Issue assigned",

        "department": department,

        "status": issue.status

    }


# --------------------------------------------------
# DASHBOARD STATISTICS
# --------------------------------------------------

@app.get("/dashboard/statistics")
def dashboard_statistics(

    db: Session = Depends(get_db)

):

    total = db.query(Issue).count()


    submitted = db.query(Issue).filter(
        Issue.status == "submitted"
    ).count()


    assigned = db.query(Issue).filter(
        Issue.status == "assigned"
    ).count()


    resolved = db.query(Issue).filter(
        Issue.status == "resolved"
    ).count()


    return {

        "total": total,

        "submitted": submitted,

        "assigned": assigned,

        "resolved": resolved

    }