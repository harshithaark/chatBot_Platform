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

```
chatBot_Platform/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── auth/
│   │   ├── routes.py
│   │   ├── jwt.py
│   │   ├── dependencies.py
│   │   └── schemas.py
│   ├── users/
│   │   └── models.py
│   ├── projects/
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── schemas.py
│   ├── chat/
│   │   ├── models.py
│   │   ├── chat_schemas.py
│   │   └── chat_routes.py
│   └── chatbot.db
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── chat.html
│   ├── app.js
│   └── style.css
│
├── requirements.txt
├── run.sh
├── Procfile
└── README.md
```

---

## How to Run Locally

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Backend Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn backend.main:app --reload
```

The backend will start at `http://localhost:8000`

### Frontend Setup

Open a new terminal and run:
```bash
cd frontend
python3 -m http.server 5500
```

Then navigate to `http://localhost:5500` in your browser.

### Alternative: Run Everything with Setup Script

```bash
bash run.sh
```

---

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and get JWT token

### Projects
- `GET /projects/` - List all projects for current user
- `POST /projects/` - Create a new project
- `DELETE /projects/{project_id}` - Delete a project

### Chat
- `POST /projects/{project_id}/chat/` - Send a message to a project

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./backend/chatbot.db
```

### Database

The application uses SQLite by default. To use PostgreSQL:
1. Install PostgreSQL
2. Update `DATABASE_URL` in `backend/database.py`
3. Reinstall dependencies

---

## Deployment

### Deploy to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create a Heroku app:
```bash
heroku create your-app-name
```

4. Deploy:
```bash
git push heroku main
```

### Deploy to Other Platforms

The application includes:
- `Procfile` - For Heroku deployment
- `run.sh` - For manual server setup
- Fully containerizable with Docker

---

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**
- Change `SECRET_KEY` in `backend/auth/jwt.py`
- Use environment variables for sensitive data
- Enable HTTPS in production
- Use a production database (PostgreSQL recommended)
- Update CORS settings in `backend/main.py`

---

## Testing

Example API calls:

**Register:**
```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=user@example.com&password=password123"
```

**Login:**
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=password123"
```

---

## License

MIT

---

## Support

For issues and questions, please create an issue in the repository.
