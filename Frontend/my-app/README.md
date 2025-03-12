# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Frontend - Task Management App

## Overview

This is the **frontend** for the Task Management & AI-Powered To-Do List application. It provides an intuitive user interface for managing tasks, receiving AI-powered suggestions, and tracking productivity.

## Tech Stack

- **React.js** (Vite)
- **React Router** (Client-side routing)
- **Tailwind CSS** (UI Styling)
- **Recharts** (Data Visualization)
- **Fetch API** (For API requests)

---

## Installation & Setup

### 1. Navigate to Frontend Folder

cd Frontend

### 2. Install Depnedencies

npm install

### 3. Configure Environment Variables

Create a .env file inside the Frontend/ directory:

VITE_API_BASE_URL=http://localhost:3001

### 4. Run the Frontend

Development Mode

npm run dev

Build for Production

npm run build

### API Integration

The frontend communicates with the backend using Fetch API. All requests are sent to the backend hosted at:

http://localhost:3001/api/

fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
method: "GET",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
})
.then((res) => res.json())
.then((data) => console.log(data))
.catch((error) => console.error("Error fetching tasks:", error));
