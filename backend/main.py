import json
import os
import tempfile
from typing import List, Optional, Tuple

import requests
from fastapi import FastAPI, Depends, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

import geartheng
import geoExtracter
import blockchain_func
from database import engine, Base, SessionLocal
import models
import crud

app = FastAPI(title="MRV Backend")

MAX_FILES = 20
MAX_FILE_SIZE_MB = 10
ALLOWED_ORIGINS = "*"


def pin_to_ipfs(data: dict) -> Optional[str]:
    jwt = os.getenv("PINATA_JWT")
    if not jwt:
        return None
    try:
        res = requests.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            json={"pinataContent": data},
            headers={"Authorization": f"Bearer {jwt}"},
            timeout=30,
        )
        if res.ok:
            return res.json().get("IpfsHash")
    except Exception:
        pass
    return None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class ProjectCreate(BaseModel):
    name: str
    developerEntity: str
    ecosystemType: str
    location: str


class ProjectListResponse(BaseModel):
    projects: List[dict]
    total: int
    page: int
    pageSize: int


def _parse_coords(coords_json: Optional[str]) -> Optional[List[List[float]]]:
    """Parse explicit coordinates from JSON."""
    if not coords_json:
        return None

    try:
        coords = json.loads(coords_json)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=400, detail="Invalid coords_json format") from exc

    if not isinstance(coords, list) or len(coords) < 10:
        raise HTTPException(status_code=400, detail="coords_json must contain at least 10 points")

    parsed: List[List[float]] = []
    for point in coords:
        if not isinstance(point, list) or len(point) != 2:
            raise HTTPException(status_code=400, detail="Each coordinate must be [lon, lat]")

        lon, lat = point
        parsed.append([float(lon), float(lat)])

    return parsed


@app.get("/")
def read_root():
    return {"status": "ok", "service": "mrv-backend"}


@app.get("/projects")
def get_projects(
    page: int = 1,
    limit: int = 10,
    status: Optional[str] = None,
    location: Optional[str] = None,
    db: Session = Depends(get_db),
):
    skip = (page - 1) * limit
    query = db.query(models.Project)

    if status:
        query = query.filter(models.Project.status == status)
    if location:
        query = query.filter(models.Project.location.ilike(f"%{location}%"))

    projects = query.offset(skip).limit(limit).all()
    total = query.count()

    return ProjectListResponse(
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


@app.post("/projects")
async def create_project(proj: ProjectCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Project).filter(models.Project.name == proj.name).first()
    if existing:
        raise HTTPException(status_code=409, detail="Project name already exists")

    new_project = models.Project(**proj.model_dump())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "id": new_project.id,
        "name": new_project.name,
        "developerEntity": new_project.developerEntity,
        "ecosystemType": new_project.ecosystemType,
        "location": new_project.location,
        "status": new_project.status,
        "totalCredits": new_project.totalCredits,
        "createdAt": new_project.createdAt.isoformat() if new_project.createdAt else "",
        "tx_hash": new_project.tx_hash,
        "ipfs_cid": new_project.ipfs_cid,
    }


@app.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    total_projects = db.query(models.Project).count()
    verified = db.query(models.Project).filter(models.Project.status == "verified").count()
    pending = db.query(models.Project).filter(models.Project.status == "pending").count()
    total_credits = db.query(func.sum(models.Project.totalCredits)).scalar() or 0

    return {
        "total_projects": total_projects,
        "verified_projects": verified,
        "pending_projects": pending,
        "total_credits_issued": float(total_credits),
    }


@app.post("/projects/{project_id}/documents")
async def upload_project_documents(
    project_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return {
        "project_id": project_id,
        "files_received": len(files),
        "status": "uploaded",
    }


@app.post("/assets/upload")
async def upload_assets(
    files: List[UploadFile] = File(...),
    coords_json: Optional[str] = Form(default=None),
    project_id: Optional[str] = Form(default=None),
    notes: Optional[str] = Form(default=None),
    db: Session = Depends(get_db),
):
    if not files:
        raise HTTPException(status_code=400, detail="At least one file is required")
    if len(files) > MAX_FILES:
        raise HTTPException(status_code=400, detail=f"Maximum {MAX_FILES} images per upload")

    image_summaries = []
    gps_points: List[Tuple[float, float]] = []

    with tempfile.TemporaryDirectory() as temp_dir:
        for file in files:
            filename = file.filename or "uploaded_image"
            ext = os.path.splitext(filename)[1]
            temp_path = os.path.join(temp_dir, f"{len(image_summaries)}{ext}")

            content = await file.read()
            if len(content) > MAX_FILE_SIZE_MB * 1024 * 1024:
                raise HTTPException(
                    status_code=400,
                    detail=f"{filename} exceeds {MAX_FILE_SIZE_MB}MB limit",
                )

            with open(temp_path, "wb") as buffer:
                buffer.write(content)

            metadata = geoExtracter.extract_image_metadata(temp_path)
            metadata["file_name"] = filename
            metadata["content_type"] = file.content_type
            metadata["file_size_bytes"] = len(content)

            if metadata.get("has_gps"):
                gps_points.append((metadata["latitude"], metadata["longitude"]))

            image_summaries.append(metadata)

    coordinates = _parse_coords(coords_json)
    if not coordinates:
        if not gps_points:
            raise HTTPException(
                status_code=400,
                detail="No usable coordinates found. Provide coords_json or upload GPS-tagged images.",
            )
        coordinates = [[lon, lat] for lat, lon in gps_points]

    if len(coordinates) < 10:
        raise HTTPException(
            status_code=422,
            detail="At least 10 coordinates required. Upload more images or provide explicit boundary.",
        )

    try:
        credit_result = geartheng.run_pipeline(coordinates)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Credit calculation failed: {exc}") from exc

    pid = int(project_id) if project_id else None
    tx_hash = None
    ipfs_cid = None

    mrv_report = {
        "project_id": pid,
        "files_processed": len(image_summaries),
        "gps_points": coordinates,
        "carbon_credit": credit_result,
    }
    ipfs_cid = pin_to_ipfs(mrv_report)

    if pid:
        project = db.query(models.Project).filter(models.Project.id == pid).first()
        if project:
            project.totalCredits = credit_result["total_credits"]
            project.status = "pending"
            if ipfs_cid:
                project.ipfs_cid = ipfs_cid
            db.commit()

            try:
                bc_result = blockchain_func.add_unit(
                    id=pid,
                    contributer="system",
                    project_id=pid,
                    geo_location=str(coordinates[0]),
                )
                tx_hash = bc_result.get("tx_hash")
                project.tx_hash = tx_hash
                db.commit()
            except Exception:
                pass

    result = {
        "project_id": pid,
        "notes": notes,
        "files_processed": len(image_summaries),
        "files_with_gps": len(gps_points),
        "coordinates": coordinates,
        "images": image_summaries,
        "carbon_credit": credit_result,
    }

    if tx_hash:
        result["tx_hash"] = tx_hash
    if ipfs_cid:
        result["ipfs_cid"] = ipfs_cid

    return result