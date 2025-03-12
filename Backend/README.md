# Backend - Task Management API

## Overview

This is the **backend service** for the Task Management & AI-Powered To-Do List application. It provides API endpoints for:

- User Authentication
- Task Management
- AI-Powered Suggestions
- Reports & Analytics

## Tech Stack

- **Node.js** (Express.js)
- **MongoDB** (Mongoose ODM)
- **JWT Authentication**
- **OpenAI API** (For AI-generated suggestions)
- **Cron Jobs** (Automated cleanup tasks)

## Dependencies

The backend relies on the following packages:

```json
{
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.13.1",
  "node-cron": "^3.0.3",
  "openai": "^4.86.1"
}


These will be installed automatically when you run npm install

Installation & Setup

1. Navigate to Backend Folder

cd Backend

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file inside the Backend/ directory:

PORT=3001
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_key_here

4. Run the Server

Development Mode (With Nodemon for Auto-Restart)

npm run dev

production mode:

npm start

API Endpoints:

Authentication (Auth Routes)

POST

/api/auth/register - Register a new user

POST

/api/auth/login - User login (JWT Token)

GET

/api/auth/user - Get logged-in user info

Task Management (Task Routes)

GET
/api/tasks - Fetch all tasks

POST

/api/tasks - Create a new task

PUT
/api/tasks/:id - Update a task

DELETE

/api/tasks/:id - Delete a task

AI Suggestions (AI Routes)

POST

/api/ai/task-analysis - AI-based task analysis

POST

/api/ai/task-templates - AI-generated task templates

POST

/api/ai/workflow-improvement - Workflow improvement suggestions

Reports & Analytics

GET

/api/reports/summary - Get task summary stats

GET

/api/reports/trends - View task trends

GET

/api/reports/productivity-score - Productivity score
```
