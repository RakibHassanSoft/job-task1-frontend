
# Personal Expense Tracker - Next
## Overview
This is the **frontend** of a Personal Expense Tracker application built with **React, TypeScript, React Router DOM, TanStack Query, and Axios**.  
It provides a **clean, responsive, and professional UI** for users to manage their personal expenses.  
## Features
- **User Authentication**: Register and login using JWT-based API authentication.  
- **Home Page**: Introduces the application and its main features.  
- **Create Expense**: Add new expenses with details like title, amount, category, and date.  
- **Manage Expenses**: Edit or delete existing expenses with a professional UI.  
- **Dashboard**: See total data summary, visualize expenses, and view a detailed table of all expenses.  
- **Responsive UI**: Works seamlessly on mobile, tablet, and desktop devices.  
- **Reusable Components**: Tables, cards, forms, and modals for consistent UI.  
## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS  
- **Routing**: React Router DOM  
- **Data Fetching & Caching**: TanStack Query, Axios  
- **State Management**: React useState + React Query cache  
- **UI Components**: Tailwind CSS + HeroIcons + React Icons  
## Installation
1. Clone the repository
```bash
git clone https://github.com/RakibHassanSoft/job-task1-frontend.git
```
2. Navigate to the project directory
```bash
cd job-task1-frontend
```
3. Install dependencies
```bash
npm install
```
4. Create a `.env` file in the root directory and set your API URL(Optional because I used in api.ts for testing)
```env
VITE_API_URL=https://job-task1-backend.onrender.com/api/v1
```
5. Start the development server
```bash
npm run dev
```
6. live url backend (it is render so it can take some time)
-backend url
```bash
https://job-task1-backend.onrender.com/
```
-frontend url
```
https://jocular-fenglisu-bf33a6.netlify.app/
```
7. Dummy user email
```
user@gmail.com
```
8. Dummy user password
```
user@123
```
## Usage
1. Open the app in the browser (default: http://localhost:5173 or https://job-task1-backend.onrender.com/)  
2. Register a new user or login:  
   - Email: `user@gmail.com`  
   - Password: `user@123`  
3. After login, you will be redirected to the **Home Page**.  
4. Navigate to **Create Expense** to add new expenses.  
5. Navigate to **Manage Expenses** to edit or delete existing expenses.  
6. Dashboard shows **total summary**, charts, and table view of all expenses.  
## Folder Structure
```
src/
├─ api/               # Axios instances and API functions
├─ components/        # Reusable UI components (cards, tables, modals, forms)
├─ hooks/             # Custom hooks (e.g., useCurrentData, useAuth)
├─ pages/             # Main pages (Home, Dashboard, Create Expense, Manage Expenses)
├─ routes/            # React Router route configuration
├─ utils/             # Helper functions and constants
├─ App.tsx            # Main app component
└─ main.tsx           # React entry point
```

