from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database import Base


class Issue(Base):

    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)

    category = Column(String, nullable=False)

    description = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)

    image_path = Column(String, nullable=True)

    severity = Column(String, default="medium")

    status = Column(String, default="submitted")

    department = Column(String, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )