from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.projects.models import Project
from backend.chat.models import Prompt
from backend.chat.chat_schemas import ChatRequest
from backend.auth.deps import get_current_user

router = APIRouter(prefix="/projects/{project_id}/chat", tags=["Chat"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def chat_with_project(
    project_id: int,
    data: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    prompts = db.query(Prompt).filter(
        Prompt.project_id == project_id
    ).all()

    system_prompt = " ".join([p.content for p in prompts])

    response = f"""
System Instructions:
{system_prompt}

User Message:
{data.message}

Assistant Response:
This is a mock response. LLM integration can be added here.
"""

    return {
        "project_id": project_id,
        "user_message": data.message,
        "assistant_response": response.strip()
    }
