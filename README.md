## Final Work - Task Management System

Overview

This project is a full-stack Task Management System with AI-powered suggestions. It includes:

Frontend (React + Vite + TailwindCSS)

Backend (Node.js + Express + MongoDB)

AI Features (OpenAI for AI-based task analysis and suggestions)

This guide will help you set up the project locally and run both frontend and backend simultaneously.

Clone the repository to your local machine
git clone https://github.com/Gediminas91/codeAcademy.git

Navigate into the project folder
cd FinalWork

# Install Dependencies

# Backend Dependencies

cd Backend
npm install

# Frontend Dependencies

cd ../Frontend
npm install

# Set Up Environment Variables

🔹 Backend (Backend/.env)

Create a .env file inside the Backend folder and add:

PORT=3001
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_key_here

Frontend (Frontend/.env - Optional)

If required, create .env inside Frontend and add:

VITE_API_BASE_URL=http://localhost:3001/api

(If no .env is provided, the frontend will still work with default API settings.)

# Run the Project

Instead of running backend & frontend separately, use the FinalWork package.json script to start both at once.

cd FinalWork
npm install # Install concurrently
npm run dev # Starts both frontend & backend

This will:
Start the backend on http://localhost:3001
Start the frontend on http://localhost:5173
