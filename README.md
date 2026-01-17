# Chatbot Platform

A minimal chatbot platform that allows users to create and manage AI-powered chatbot agents with custom prompts and chat functionality.

---

## Features

- User registration and login using JWT authentication
- Project/agent creation per user
- Prompt storage per project
- Chat interface per project (LLM-ready)
- Secure user-based data isolation

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- JWT (python-jose)
- SQLite (can be replaced with PostgreSQL)

### Frontend
- HTML
- CSS
- Vanilla JavaScript

---

## Project Structure

chatBot_Platform/
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── auth/
│ │ ├── routes.py
│ │ ├── jwt.py
│ │ └── dependencies.py
│ ├── users/
│ │ └── models.py
│ ├── projects/
│ │ ├── models.py
│ │ ├── routes.py
│ │ └── schemas.py
│ ├── chat/
│ │ ├── models.py
│ │ ├── schemas.py
│ │ └── chat_routes.py
│ └── chatbot.db
│
├── frontend/
│ ├── register.html
│ ├── dashboard.html
│ ├── app.js
│ └── style.css
|--- index.html
├── requirements.txt
└── README.md


---

## How to Run Locally

### Backend
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload

cd frontend
python3 -m http.server 5500
