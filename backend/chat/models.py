"""
Prompt Model
Database schema for storing chatbot prompts/instructions
"""

from sqlalchemy import Column, Integer, String, ForeignKey
from backend.database import Base


class Prompt(Base):
    """Prompt model for storing system instructions per project"""
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"))
