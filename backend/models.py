from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from database import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float)
    longitude = Column(Float)

class Project(Base):
    __tablename__ = "projects"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String, unique=True, index=True)
    developerEntity = Column(String)
    ecosystemType   = Column(String)
    location        = Column(String)
    status          = Column(String, default="pending")
    totalCredits    = Column(Float, default=0.0)
    createdAt       = Column(DateTime, default=datetime.utcnow)
    tx_hash         = Column(String, nullable=True)
    ipfs_cid        = Column(String, nullable=True)