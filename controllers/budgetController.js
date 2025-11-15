import Budget from '../models/Budget.js';
import { validationResult } from 'express-validator';

export const listBudgetsForMonth = async (req, res, next) => {
  try {
    const { month } = req.query; 
    if (!month) return res.status(400).json({ message: 'month is required' });
    const budgets = await Budget.find({ user: req.user._id, month }).populate('category');
    res.json(budgets);
  } catch (err) { next(err); }
}

export const upsertBudget = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { category, month, limit } = req.body;
    const existing = await Budget.findOne({ user: req.user._id, category, month });
    if (existing) {
      existing.limit = limit;
      await existing.save();
      return res.json(existing);
    }
    const b = new Budget({ user: req.user._id, category, month, limit });
    await b.save();
    res.json(b);
  } catch (err) { next(err); }
}

export const deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const b = await Budget.findOneAndDelete({ _id: id, user: req.user._id });
    if (!b) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}
