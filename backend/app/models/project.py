from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    developerEntity = Column(String)
    ecosystemType = Column(String)
    location = Column(String)
    status = Column(String, default="pending")
    totalCredits = Column(Float, default=0.0)
    createdAt = Column(DateTime, default=datetime.utcnow)
    tx_hash = Column(String, nullable=True)
    ipfs_cid = Column(String, nullable=True)
