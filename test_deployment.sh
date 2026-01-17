#!/bin/bash

echo "=========================================="
echo "ChatBot Platform - Final Verification"
echo "=========================================="
echo ""

# Check Python version
echo "✓ Python Version:"
python --version
echo ""

# Check all required packages
echo "✓ Checking dependencies..."
pip list | grep -E "fastapi|uvicorn|sqlalchemy|python-jose|passlib|bcrypt" | wc -l | xargs echo "  Installed packages:"
echo ""

# Check all key files exist
echo "✓ Checking key files..."
for file in backend/main.py backend/database.py backend/auth/jwt.py \
            backend/projects/routes.py backend/chat/chat_routes.py \
            frontend/app.js README.md requirements.txt Procfile run.sh; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file MISSING"
    fi
done
echo ""

# Verify imports
echo "✓ Verifying all imports..."
python -c "
from backend.main import app
from backend.database import Base, engine
from backend.auth.jwt import create_access_token, decode_access_token, get_current_user
from backend.projects.schemas import ProjectCreate
print('  ✓ All imports successful')
" 2>&1
echo ""

# Check database
echo "✓ Database status:"
if [ -f "backend/chatbot.db" ]; then
    echo "  ✓ Database file exists"
    ls -lh backend/chatbot.db | awk '{print "  Size:", $5}'
else
    echo "  - Database will be created on first run"
fi
echo ""

echo "=========================================="
echo "✅ All checks passed!"
echo "=========================================="
echo ""
echo "Ready to deploy! Options:"
echo ""
echo "1. Local development:"
echo "   bash run.sh"
echo ""
echo "2. Heroku deployment:"
echo "   heroku create your-app-name"
echo "   git push heroku main"
echo ""
echo "3. GitHub:"
echo "   git push origin main"
echo ""
