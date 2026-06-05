from pydantic import BaseModel
from typing import Optional


class ProjectCreate(BaseModel):
    name: str
    developerEntity: str
    ecosystemType: str
    location: str


class ProjectList(BaseModel):
    projects: list[dict]
    total: int
    page: int
    pageSize: int
