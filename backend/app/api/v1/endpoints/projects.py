from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud.project import CRUDProject
from app.schemas.project import ProjectCreate, ProjectList

router = APIRouter()


@router.get("/projects")
def get_projects(
    page: int = 1,
    limit: int = 10,
    status: str | None = None,
    location: str | None = None,
    db: Session = Depends(get_db),
):
    crud = CRUDProject(db)
    skip = (page - 1) * limit
    projects, total = crud.get_all(
        skip=skip, limit=limit, status=status, location=location
    )

    return ProjectList(
        projects=[
            {
                "id": p.id,
                "name": p.name,
                "location": p.location,
                "ecosystemType": p.ecosystemType,
                "developerEntity": p.developerEntity,
                "status": p.status,
                "totalCredits": p.totalCredits,
                "createdAt": p.createdAt.isoformat() if p.createdAt else "",
                "tx_hash": p.tx_hash,
                "ipfs_cid": p.ipfs_cid,
            }
            for p in projects
        ],
        total=total,
        page=page,
        pageSize=limit,
    )


@router.post("/projects")
async def create_project(
    proj: ProjectCreate, db: Session = Depends(get_db)
):
    crud = CRUDProject(db)
    existing = crud.get_by_name(proj.name)
    if existing:
        raise HTTPException(status_code=409, detail="Project name already exists")

    project = crud.create(
        name=proj.name,
        developerEntity=proj.developerEntity,
        ecosystemType=proj.ecosystemType,
        location=proj.location,
    )

    return {
        "id": project.id,
        "name": project.name,
        "developerEntity": project.developerEntity,
        "ecosystemType": project.ecosystemType,
        "location": project.location,
        "status": project.status,
        "totalCredits": project.totalCredits,
        "createdAt": project.createdAt.isoformat() if project.createdAt else "",
        "tx_hash": project.tx_hash,
        "ipfs_cid": project.ipfs_cid,
    }


@router.post("/projects/{project_id}/documents")
async def upload_project_documents(
    project_id: int,
    files: list = [],
    db: Session = Depends(get_db),
):
    crud = CRUDProject(db)
    project = crud.get_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return {
        "project_id": project_id,
        "files_received": len(files),
        "status": "uploaded",
    }
