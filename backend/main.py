from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Chatbot Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⬇️ IMPORTS ONLY AFTER CORS
from backend.database import engine, Base
from backend.users.models import User
from backend.projects.models import Project
from backend.chat.models import Prompt

from backend.auth.routes import router as auth_router
from backend.projects.routes import router as project_router
from backend.chat.chat_routes import router as chat_router

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(chat_router)
