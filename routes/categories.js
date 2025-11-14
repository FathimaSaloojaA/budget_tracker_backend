import express from 'express';
import auth from '../middlewares/auth.js';
import { listCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { body } from 'express-validator';

const router = express.Router();
router.use(auth);

router.get('/', listCategories);
router.post('/', [ body('name').notEmpty().withMessage('Name required') ], createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
