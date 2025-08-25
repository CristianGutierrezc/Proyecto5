@echo off
cd /d %~dp0
start cmd /k "cd backend-express && npm install && npm run dev"
start cmd /k "cd frontend-react && npm install && npm run dev"
