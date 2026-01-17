"""
Database Configuration
SQLAlchemy setup for SQLite database with dynamic file path
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get the base directory dynamically for cross-platform compatibility
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'backend', 'chatbot.db')}"

# Create database engine
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Session factory for database operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()
