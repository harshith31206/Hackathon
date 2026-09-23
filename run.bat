@echo off
echo =========================================
echo Starting AutoPR Platform (Windows)
echo =========================================

echo.
echo Starting Backend Server...
:: Open a new command prompt, activate the virtual environment, and run the Python backend
start "AutoPR Backend" cmd /k "cd backend && venv\Scripts\activate && python main.py"

echo Starting Frontend Server...
:: Open a new command prompt and start the Vite frontend
start "AutoPR Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo =========================================
echo Both servers are starting in separate windows.
echo Frontend will be available at: http://localhost:5173
echo Close those windows to stop the servers.
echo =========================================
pause
