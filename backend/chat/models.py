from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"))
