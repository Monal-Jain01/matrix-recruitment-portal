@echo off
echo Starting MATRIX Recruitment Portal in Production Mode...
echo.

echo Step 1: Building frontend...
cd frontend
call npm run build
cd ..

echo.
echo Step 2: Starting production server...
cd backend
call npm start

pause