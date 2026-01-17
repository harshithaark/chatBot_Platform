"""
ChatBot Platform Backend
FastAPI application with JWT authentication and project management
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="Chatbot Platform", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import models and routers after middleware setup
from backend.database import engine, Base
from backend.users.models import User
from backend.projects.models import Project
from backend.chat.models import Prompt

from backend.auth.routes import router as auth_router
from backend.projects.routes import router as project_router
from backend.chat.chat_routes import router as chat_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router)
app.include_router(project_router)
app.include_router(chat_router)

# Serve static frontend files
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(frontend_path):
    app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Serve index.html at root
@app.get("/")
async def root():
    index_path = os.path.join(os.path.dirname(__file__), "..", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "ChatBot Platform API running"}
