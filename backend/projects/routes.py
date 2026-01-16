from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.projects.models import Project
from backend.projects.schemas import ProjectCreate
from backend.auth.deps import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    project = Project(
        name=data.name,
        description=data.description,
        user_id=current_user.id
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    return project


@router.get("/")
def list_projects(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    projects = db.query(Project).filter(
        Project.user_id == current_user.id
    ).all()
    return projects
