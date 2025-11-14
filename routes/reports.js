import express from 'express';
import auth from '../middlewares/auth.js';
import { monthlyReport } from '../controllers/reportController.js';

const router = express.Router();
router.use(auth);

router.get('/monthly', monthlyReport); // ?month=YYYY-MM

export default router;
