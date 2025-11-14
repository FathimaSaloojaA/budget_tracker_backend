import express from 'express';
import auth from '../middlewares/auth.js';
import { listBudgetsForMonth, upsertBudget, deleteBudget } from '../controllers/budgetController.js';
import { body } from 'express-validator';

const router = express.Router();
router.use(auth);

router.get('/', listBudgetsForMonth); // ?month=YYYY-MM
router.post('/', [ body('category').notEmpty(), body('month').matches(/\d{4}-\d{2}/), body('limit').isFloat({ min: 0 }) ], upsertBudget);
router.delete('/:id', deleteBudget);

export default router;
