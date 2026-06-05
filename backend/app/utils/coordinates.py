import json
from typing import Optional

from fastapi import HTTPException


def parse_coordinates(coords_json: Optional[str]) -> Optional[list[list[float]]]:
    if not coords_json:
        return None
    try:
        coords = json.loads(coords_json)
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=400, detail="Invalid coords_json format"
        ) from exc
    if not isinstance(coords, list) or len(coords) < 10:
        raise HTTPException(
            status_code=400,
            detail="coords_json must contain at least 10 points",
        )
    parsed: list[list[float]] = []
    for point in coords:
        if not isinstance(point, list) or len(point) != 2:
            raise HTTPException(
                status_code=400, detail="Each coordinate must be [lon, lat]"
            )
        lon, lat = point
        parsed.append([float(lon), float(lat)])
    return parsed
