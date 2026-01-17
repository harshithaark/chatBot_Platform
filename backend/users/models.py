"""
User Model
Database schema for user authentication and management
"""

from sqlalchemy import Column, Integer, String
from backend.database import Base


class User(Base):
    """User model with email and hashed password"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
