@echo off
echo Starting Backend...
start cmd /k "cd backend && npm install && node server.js"

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo Both servers are starting in separate windows!
