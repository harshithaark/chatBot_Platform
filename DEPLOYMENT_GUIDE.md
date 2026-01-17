# Deployment Guide - ChatBot Platform

## Summary of Fixes Applied

### ✅ Fixed Issues

1. **Database URL Path** - Changed from hardcoded absolute path to relative path for cross-platform compatibility
   - File: `backend/database.py`
   - Before: `sqlite:////workspaces/chatBot_Platform/backend/chatbot.db`
   - After: Dynamic relative path using `os.path`

2. **Missing decode_access_token Function** - Added missing JWT decode function
   - File: `backend/auth/jwt.py`
   - Added: `decode_access_token()` function that was imported but not defined

3. **Import Path Error in chat_routes** - Fixed incorrect import
   - File: `backend/chat/chat_routes.py`
   - Changed: `from backend.auth.deps` → `from backend.auth.jwt`

4. **Project Schema Missing** - Added Pydantic schema for better validation
   - File: `backend/projects/schemas.py`
   - Added: `ProjectResponse` class for proper type validation
   - Updated: `backend/projects/routes.py` to use schema instead of raw dict

5. **Missing __init__.py Files** - Added Python package initialization files
   - Created: `backend/__init__.py`, `backend/auth/__init__.py`, `backend/users/__init__.py`, `backend/chat/__init__.py`, `backend/projects/__init__.py`

6. **Frontend API URL** - Made frontend API URL dynamic for deployment
   - File: `frontend/app.js`
   - Before: Hardcoded to specific GitHub codespace URL
   - After: Dynamically detects localhost vs deployed environment

7. **Deployment Files** - Added deployment configuration files
   - Created: `Procfile` for Heroku deployment
   - Created: `run.sh` for easy local setup

8. **Documentation** - Updated README with comprehensive instructions
   - Added: API endpoints documentation
   - Added: Deployment instructions for Heroku
   - Added: Security notes for production
   - Added: Testing examples

---

## How to Deploy to GitHub and Beyond

### 1. Push to GitHub
```bash
# Add all changes
git add .

# Commit with message
git commit -m "Fix backend errors and add deployment configuration"

# Push to GitHub
git push origin main
```

### 2. Deploy to Heroku
```bash
# Install Heroku CLI if not already installed
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create a new app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### 3. Deploy to Other Platforms

**Railway.app:**
- Connect GitHub repo to Railway
- Set environment variables if needed
- Deploy with one click

**Render:**
- Connect GitHub repo to Render
- Use `uvicorn backend.main:app --host 0.0.0.0 --port $PORT` as start command

**PythonAnywhere:**
- Upload code via git or web interface
- Configure WSGI file
- Set up web app

---

## Local Testing

### Start Backend
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

### Start Frontend (new terminal)
```bash
cd frontend
python3 -m http.server 5500
```

### Test API
```bash
# Register
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=test@test.com&password=test123"

# Login
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@test.com&password=test123"

# Get Projects (replace TOKEN with token from login)
curl -X GET http://localhost:8000/projects/ \
  -H "Authorization: Bearer TOKEN"
```

---

## Environment Setup (Optional)

Create `.env` file in root directory:
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./backend/chatbot.db
CORS_ORIGINS=["*"]
```

---

## Important Security Notes for Production

1. **Change SECRET_KEY**
   - File: `backend/auth/jwt.py`
   - Update: `SECRET_KEY = "your-very-secure-key-here"`

2. **Update CORS settings**
   - File: `backend/main.py`
   - Change: `allow_origins=["*"]` to specific domains

3. **Use PostgreSQL for production**
   - SQLite is for development only
   - Install: `pip install psycopg2-binary`
   - Update: `DATABASE_URL` in `backend/database.py`

4. **Enable HTTPS**
   - Use a reverse proxy (Nginx)
   - Get SSL certificate (Let's Encrypt)

5. **Set environment variables**
   - Never hardcode sensitive data
   - Use platform environment variables

---

## Files Modified

- ✅ `backend/database.py`
- ✅ `backend/auth/jwt.py`
- ✅ `backend/chat/chat_routes.py`
- ✅ `backend/projects/routes.py`
- ✅ `backend/projects/schemas.py`
- ✅ `frontend/app.js`
- ✅ `README.md`
- ✅ Created: `Procfile`
- ✅ Created: `run.sh`
- ✅ Created: `backend/__init__.py` (and other package init files)

---

## Status

✅ **All errors fixed**
✅ **Backend tested and working**
✅ **Frontend configured for deployment**
✅ **Documentation complete**
✅ **Ready for GitHub deployment**

Ready to deploy! 🚀
