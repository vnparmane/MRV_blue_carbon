from app.db.base import engine
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(bind=engine)
