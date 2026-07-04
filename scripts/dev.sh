#!/bin/bash
set -euo pipefail

# Start the backend in the background
(cd backend && uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000) &

# Wait for the backend to start
sleep 5

# Start the frontend development server
(cd frontend && npm run dev)