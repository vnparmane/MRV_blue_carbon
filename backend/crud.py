from database import SessionLocal
from models import Location, Project
from database import engine, Base
import models

Base.metadata.create_all(bind=engine)


def save_location(lat, lon):
    db = SessionLocal()
    new_location = Location(latitude=lat, longitude=lon)
    db.add(new_location)
    db.commit()
    db.close()


def add_project(name: str, developerEntity: str, ecosystemType: str, location: str):
    db = SessionLocal()
    new_project = Project(
        name=name,
        developerEntity=developerEntity,
        ecosystemType=ecosystemType,
        location=location
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    db.close()
    return new_project


def get_all_projects():
    db = SessionLocal()
    data = db.query(models.Project).all()
    db.close()
    return data

def update_project_credits(project_id: int, totalCredits: float, status: str = "pending"):
    db = SessionLocal()
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project:
        project.totalCredits = totalCredits
        project.status = status
        db.commit()
    db.close()
    return project

def update_project_tx(project_id: int, tx_hash: str, ipfs_cid: str = None):
    db = SessionLocal()
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project:
        project.tx_hash = tx_hash
        if ipfs_cid:
            project.ipfs_cid = ipfs_cid
        db.commit()
    db.close()
    return project