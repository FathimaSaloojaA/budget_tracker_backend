import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import budgetRoutes from './routes/budgets.js';
import expenseRoutes from './routes/expenses.js';
import reportRoutes from './routes/reports.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://budget-tracker-frontend-rosy.vercel.app' // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you need cookies or auth headers
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/report', reportRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
  });

