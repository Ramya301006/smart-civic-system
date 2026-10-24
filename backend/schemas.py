from typing import Literal, Optional
from pydantic import BaseModel, EmailStr, Field


class IssueOut(BaseModel):
    id: int
    ticket: str
    description: str
    location: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    photo_url: Optional[str] = None
    dept: str
    department: str
    priority: str
    confidence: int
    summary: str
    ai_source: str
    status: str
    reporter: str
    created_at: int
    due_at: int
    resolved_at: Optional[int] = None


class TrackOut(BaseModel):
    ticket: str
    department: str
    priority: str
    status: str
    summary: str
    created_at: int
    due_at: int
    resolved_at: Optional[int] = None


class IssueUpdate(BaseModel):
    status: Optional[Literal["Assigned", "In progress", "Resolved"]] = None
    dept: Optional[str] = None


class StaffCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=64)
    role: Literal["officer", "admin"] = "officer"
    department: Optional[str] = None