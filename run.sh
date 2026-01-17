#!/bin/bash
# Setup script for running the ChatBot Platform

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Creating database..."
python -c "from backend.database import Base, engine; Base.metadata.create_all(bind=engine); print('Database created successfully')"

echo "Starting backend server on port 8000..."
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload &

echo "Starting frontend server on port 5500..."
python3 -m http.server 5500

echo "Frontend: http://localhost:5500"
echo "Backend API: http://localhost:8000"
