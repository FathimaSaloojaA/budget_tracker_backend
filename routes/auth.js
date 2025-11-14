import express from 'express';
import { register, login } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be >=6 chars')
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

export default router;
