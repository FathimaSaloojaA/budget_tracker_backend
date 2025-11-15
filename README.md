# Budget Tracker - Backend

This is the **backend** of the Budget Tracker application built using **Node.js** and **Express.js**, with **MongoDB** as the database.  
It provides REST APIs for managing expenses, budgets, categories, and generating monthly reports.

---

## 🌐 Live API

- **Backend API (Live):** [https://budget-tracker-backend-rroy.onrender.com/api](https://your-backend-live-url.com/api)

---

## 🛠 Technologies Used

- **Node.js** with **Express.js** for server
- **MongoDB / Mongoose** for database
- **dotenv** for environment variables
- **Cors** for frontend-backend communication
- **Nodemon** for development
- **REST API** design

---

## 📦 Getting Started Locally

### 1. Clone the repository
```bash
git clone # Budget Tracker - Backend

This is the **backend** of the Budget Tracker application built using **Node.js** and **Express.js**, with **MongoDB** as the database.  
It provides REST APIs for managing expenses, budgets, categories, and generating monthly reports.

---

## 🌐 Live API

- **Backend API (Live):** [https://budget-tracker-backend-rroy.onrender.com/api](https://your-backend-live-url.com/api)

---

## 🛠 Technologies Used

- **Node.js** with **Express.js** for server
- **MongoDB / Mongoose** for database
- **dotenv** for environment variables
- **Cors** for frontend-backend communication
- **Nodemon** for development
- **REST API** design

---

## 📦 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
2. Install dependencies
npm install

3. Create environment variables

Create a .env file in the root of the backend project:

PORT=5000



Replace MONGO_URI with your MongoDB Atlas URI if using a cloud database.

4. Start the server
npm run dev


The server will run at http://localhost:5000.

⚡ API Endpoints
Categories

GET /api/categories - List all categories

POST /api/categories - Add a new category

PUT /api/categories/:id - Update category

DELETE /api/categories/:id - Delete category

Expenses

GET /api/expenses - Get expenses (filter by date)

POST /api/expenses - Add a new expense

PUT /api/expenses/:id - Update expense

DELETE /api/expenses/:id - Delete expense

Budgets

GET /api/budgets?month=YYYY-MM - Get budgets for month

POST /api/budgets - Add or update budget

DELETE /api/budgets/:id - Delete budget

Reports

GET /api/reports/monthly?month=YYYY-MM - Monthly report per category

📝 Next Steps / TODO

If time runs out, these improvements can be added:



Validation for request payloads

Unit testing for APIs

Pagination for expenses and categories

Better error handling with proper status codes

📂 Project Structure
backend/
├─ controllers/    # Controller functions for APIs
├─ models/         # Mongoose models
├─ routes/         # Express routes
├─ middleware/     # Custom middleware
├─ config/         # DB & environment setup
├─ server.js       # Main entry point
├─ .env            # Environment variables
└─ package.json
