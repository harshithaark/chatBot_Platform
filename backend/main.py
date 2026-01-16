from fastapi import FastAPI

from backend.database import engine, Base

# 🔴 IMPORTANT: import models so SQLAlchemy knows them
from backend.users.models import User
from backend.projects.models import Project
from backend.chat.models import Prompt
from backend.projects.routes import router as project_router
from backend.chat.routes import router as prompt_router


from backend.auth.routes import router as auth_router

app = FastAPI()

# create tables
Base.metadata.create_all(bind=engine)

# routes
app.include_router(auth_router)
app.include_router(project_router)
app.include_router(prompt_router)

