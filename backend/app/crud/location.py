from sqlalchemy.orm import Session
from app.models.location import Location


class CRUDLocation:
    def __init__(self, db: Session):
        self.db = db

    def create(self, lat: float, lon: float) -> Location:
        location = Location(latitude=lat, longitude=lon)
        self.db.add(location)
        self.db.commit()
        self.db.refresh(location)
        return location
