from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.api.deps import get_db
from app.models.project import Project

router = APIRouter()


@router.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    total_projects = db.query(Project).count()
    verified = (
        db.query(Project).filter(Project.status == "verified").count()
    )
    pending = (
        db.query(Project).filter(Project.status == "pending").count()
    )
    total_credits = (
        db.query(func.sum(Project.totalCredits)).scalar() or 0
    )

    return {
        "total_projects": total_projects,
        "verified_projects": verified,
        "pending_projects": pending,
        "total_credits_issued": float(total_credits),
    }
