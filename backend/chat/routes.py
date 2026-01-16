from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.chat.models import Prompt
from backend.chat.schemas import PromptCreate
from backend.projects.models import Project
from backend.auth.deps import get_current_user

router = APIRouter(prefix="/projects/{project_id}/prompts", tags=["Prompts"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_prompt(
    project_id: int,
    data: PromptCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    prompt = Prompt(
        content=data.content,
        project_id=project_id
    )
    db.add(prompt)
    db.commit()
    db.refresh(prompt)

    return prompt


@router.get("/")
def list_prompts(
    project_id: int,
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

    return prompts
