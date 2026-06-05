from sqlalchemy.orm import Session
from app.models.project import Project


class CRUDProject:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, project_id: int) -> Project | None:
        return self.db.query(Project).filter(Project.id == project_id).first()

    def get_by_name(self, name: str) -> Project | None:
        return self.db.query(Project).filter(Project.name == name).first()

    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
        status: str | None = None,
        location: str | None = None,
    ):
        query = self.db.query(Project)
        if status:
            query = query.filter(Project.status == status)
        if location:
            query = query.filter(Project.location.ilike(f"%{location}%"))
        total = query.count()
        items = query.offset(skip).limit(limit).all()
        return items, total

    def create(
        self,
        name: str,
        developerEntity: str,
        ecosystemType: str,
        location: str,
    ) -> Project:
        project = Project(
            name=name,
            developerEntity=developerEntity,
            ecosystemType=ecosystemType,
            location=location,
        )
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def update_credits(
        self, project_id: int, totalCredits: float, status: str = "pending"
    ) -> Project | None:
        project = self.get_by_id(project_id)
        if project:
            project.totalCredits = totalCredits
            project.status = status
            self.db.commit()
        return project

    def update_tx(
        self, project_id: int, tx_hash: str, ipfs_cid: str | None = None
    ) -> Project | None:
        project = self.get_by_id(project_id)
        if project:
            project.tx_hash = tx_hash
            if ipfs_cid:
                project.ipfs_cid = ipfs_cid
            self.db.commit()
        return project
