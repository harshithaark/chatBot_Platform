# ChatBot Platform

A full-stack web application for creating and managing AI chatbot agents with custom prompts and chat functionality. Built with FastAPI backend and vanilla JavaScript frontend.

## Features

- 🔐 **User Authentication** - JWT-based secure login and registration
- 📋 **Project Management** - Create and manage multiple chatbot projects
- 💬 **Chat Interface** - Real-time chat with chatbot agents
- 🛡️ **User Isolation** - Secure data isolation between users
- 🚀 **Easy Deployment** - Ready for GitHub, Heroku, Railway, and more

## Tech Stack

**Backend:**
- FastAPI (Python web framework)
- SQLAlchemy (Database ORM)
- JWT (Authentication)
- SQLite/PostgreSQL

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```
chatBot_Platform/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── database.py             # Database configuration
│   ├── auth/                   # Authentication routes & JWT
│   ├── users/                  # User model
│   ├── projects/               # Project routes & schemas
│   ├── chat/                   # Chat routes & models
│   └── chatbot.db             # SQLite database
├── frontend/
│   ├── index.html             # Login/Register page
│   ├── dashboard.html         # Projects dashboard
│   ├── chat.html              # Chat interface
│   ├── app.js                 # Frontend logic
│   └── style.css              # Styling
├── requirements.txt           # Python dependencies
├── run.sh                     # Setup script
├── Procfile                   # Deployment config
└── README.md
```

## Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation & Running

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run backend (Terminal 1):**
   ```bash
   uvicorn backend.main:app --reload
   ```
   Backend runs on: `http://localhost:8000`

3. **Run frontend (Terminal 2):**
   ```bash
   python3 -m http.server 5500
   ```
   Frontend runs on: `http://localhost:5500`

4. **Access the app:**
   - Open browser and go to `http://localhost:5500`

### Alternative: One Command Setup

```bash
bash run.sh
```

## API Endpoints

### Authentication
- `POST /register` - Create new account
- `POST /login` - Login and get JWT token

### Projects
- `GET /projects/` - Get user's projects
- `POST /projects/` - Create new project
- `DELETE /projects/{id}` - Delete project

### Chat
- `POST /projects/{id}/chat/` - Send message

## Deployment

### Deploy to Heroku

```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to Railway/Render

1. Connect your GitHub repository
2. Set environment variables if needed
3. Deploy with one click

### Docker (Optional)

```bash
docker build -t chatbot-platform .
docker run -p 8000:8000 chatbot-platform
```

## Development

### Project File Structure
- Backend routes use FastAPI router pattern
- Database uses SQLAlchemy ORM
- Frontend uses vanilla JS with dynamic API base URL
- CORS enabled for frontend-backend communication

### Adding Features

**To add a new route:**
```python
# In backend/projects/routes.py
@router.get("/new-endpoint")
def new_endpoint():
    return {"message": "hello"}
```

**To add a new model:**
```python
# In backend/yourmodule/models.py
from backend.database import Base
from sqlalchemy import Column, String

class NewModel(Base):
    __tablename__ = "new_models"
    id = Column(Integer, primary_key=True)
    name = Column(String)
```

## Environment Variables (Optional)

Create `.env` file in root:
```
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./backend/chatbot.db
```

## Security Notes

⚠️ **Before Production:**
- Change `SECRET_KEY` in `backend/auth/jwt.py`
- Update CORS settings in `backend/main.py`
- Use PostgreSQL for production database
- Enable HTTPS
- Use environment variables for sensitive data

## Troubleshooting

**CORS Error?**
- Ensure backend is running on port 8000
- Check API_BASE in frontend/app.js

**Login not working?**
- Check browser console (F12)
- Ensure backend server is running
- Verify email/password format

**Database issues?**
- Delete `chatbot.db` to reset database
- Database will recreate on next run

## Contributing

Feel free to fork and submit pull requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.

---

Made with ❤️ using FastAPI and JavaScript
