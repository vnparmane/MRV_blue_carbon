from fastapi import APIRouter

from app.api.v1.endpoints import projects, dashboard, assets

api_router = APIRouter()
api_router.include_router(projects.router)
api_router.include_router(dashboard.router)
api_router.include_router(assets.router)
