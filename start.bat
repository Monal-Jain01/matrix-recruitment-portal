@echo off
echo Building MATRIX Recruitment Portal...
echo.

echo Step 1: Building frontend...
cd frontend
call npm run build
cd ..

echo.
echo Step 2: Starting server...
cd backend
call npm run dev

pause