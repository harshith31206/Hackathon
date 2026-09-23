#!/bin/bash

echo "========================================="
echo "Starting AutoPR Platform (Mac/Linux)"
echo "========================================="

# Start backend in the background
echo "Starting Backend Server..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

# Start frontend in the background
echo "Starting Frontend Server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================="
echo "AutoPR is running!"
echo "Frontend: http://localhost:5173"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both servers."
echo "========================================="

# Trap Ctrl+C (SIGINT) and kill both background processes
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
