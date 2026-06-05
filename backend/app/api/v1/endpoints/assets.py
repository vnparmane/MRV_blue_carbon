import os
import tempfile
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import settings
from app.crud.project import CRUDProject
from app.services.carbon_credit import run_pipeline
from app.services.blockchain import add_unit
from app.services.geo import extract_image_metadata
from app.services.ipfs import pin_json_to_ipfs
from app.utils.coordinates import parse_coordinates

router = APIRouter()


@router.post("/assets/upload")
async def upload_assets(
    files: list[UploadFile] = File(...),
    coords_json: Optional[str] = Form(default=None),
    project_id: Optional[str] = Form(default=None),
    notes: Optional[str] = Form(default=None),
    db: Session = Depends(get_db),
):
    if not files:
        raise HTTPException(status_code=400, detail="At least one file is required")
    if len(files) > settings.max_files:
        raise HTTPException(
            status_code=400,
            detail=f"Maximum {settings.max_files} images per upload",
        )

    image_summaries = []
    gps_points: list[tuple[float, float]] = []

    with tempfile.TemporaryDirectory() as temp_dir:
        for file in files:
            filename = file.filename or "uploaded_image"
            ext = os.path.splitext(filename)[1]
            temp_path = os.path.join(temp_dir, f"{len(image_summaries)}{ext}")

            content = await file.read()
            if len(content) > settings.max_file_size_mb * 1024 * 1024:
                raise HTTPException(
                    status_code=400,
                    detail=f"{filename} exceeds {settings.max_file_size_mb}MB limit",
                )

            with open(temp_path, "wb") as buffer:
                buffer.write(content)

            metadata = extract_image_metadata(temp_path)
            metadata["file_name"] = filename
            metadata["content_type"] = file.content_type
            metadata["file_size_bytes"] = len(content)

            if metadata.get("has_gps"):
                gps_points.append((metadata["latitude"], metadata["longitude"]))

            image_summaries.append(metadata)

    coordinates = parse_coordinates(coords_json)
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
        credit_result = run_pipeline(coordinates)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500, detail=f"Credit calculation failed: {exc}"
        ) from exc

    pid = int(project_id) if project_id else None
    tx_hash = None
    ipfs_cid = None

    mrv_report = {
        "project_id": pid,
        "files_processed": len(image_summaries),
        "gps_points": coordinates,
        "carbon_credit": credit_result,
    }
    ipfs_cid = pin_json_to_ipfs(mrv_report)

    if pid:
        crud = CRUDProject(db)
        project = crud.get_by_id(pid)
        if project:
            crud.update_credits(pid, credit_result["total_credits"], status="pending")
            if ipfs_cid:
                crud.update_tx(pid, tx_hash or "", ipfs_cid=ipfs_cid)

            try:
                bc_result = add_unit(
                    id=pid,
                    contributer="system",
                    project_id=pid,
                    geo_location=str(coordinates[0]),
                )
                tx_hash = bc_result.get("tx_hash")
                if tx_hash:
                    crud.update_tx(pid, tx_hash, ipfs_cid=ipfs_cid)
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
