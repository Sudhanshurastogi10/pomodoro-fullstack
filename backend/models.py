from sqlalchemy import Column, Integer, String
from backend.database import Base
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    duration = Column(Integer)  # in minutes
    user_id = Column(Integer, ForeignKey("users.id"))