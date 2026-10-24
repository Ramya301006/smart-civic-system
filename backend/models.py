from sqlalchemy import Column, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="citizen")  # citizen | officer | admin
    department = Column(String, nullable=True)                # officers only, e.g. "roads"


class Issue(Base):
    __tablename__ = "issues"
    id = Column(Integer, primary_key=True, index=True)
    ticket = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, default="")
    location = Column(String, nullable=False)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    photo = Column(String, nullable=True)                     # file name inside /uploads
    reporter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    dept = Column(String, index=True, nullable=False)
    priority = Column(String, nullable=False)                 # High | Medium | Low
    confidence = Column(Integer, default=0)
    summary = Column(Text, default="")
    ai_source = Column(String, default="")
    status = Column(String, nullable=False, default="Assigned")
    created_at = Column(Integer, nullable=False)              # epoch milliseconds
    due_at = Column(Integer, nullable=False)
    resolved_at = Column(Integer, nullable=True)
    reporter = relationship("User")