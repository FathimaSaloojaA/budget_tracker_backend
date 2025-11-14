import express from 'express';
import auth from '../middlewares/auth.js';
import { createExpense, listExpenses } from '../controllers/expenseController.js';
import { body } from 'express-validator';

const router = express.Router();
router.use(auth);

router.get('/', listExpenses);
router.post('/', [ body('category').notEmpty(), body('amount').isFloat({ min: 0.01 }), body('date').notEmpty() ], createExpense);

export default router;
