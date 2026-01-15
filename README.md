# Chatbot Platform

A minimal chatbot platform that allows users to create and manage AI-powered chatbot agents with custom prompts and real-time chat using a Large Language Model (LLM) API.

---

## Features

- User registration and login with JWT authentication
- Project/agent creation per user
- Prompt management per project
- Real-time chat with LLM integration
- Secure and scalable backend design

---

## Tech Stack

- Backend: FastAPI
- Authentication: JWT
- Database: SQLite / PostgreSQL
- LLM API: OpenAI / OpenRouter
- Frontend: React

---

## Project Structure

backend/
├── main.py
├── database.py
├── auth/
│ ├── routes.py
│ └── jwt.py
├── users/
│ ├── models.py
│ └── routes.py
├── projects/
│ ├── models.py
│ └── routes.py
├── chat/
│ └── routes.py
└── requirements.txt

frontend/
├── src/
└── package.json