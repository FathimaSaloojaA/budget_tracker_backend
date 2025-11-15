import Expense from '../models/Expense.js';
import Budget from '../models/Budget.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const createExpense = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });

    let { category, amount, date } = req.body;
    amount = Number(amount); 

    const categoryId = new mongoose.Types.ObjectId(category);

    const exp = new Expense({
      user: req.user._id,
      category: categoryId,
      amount,
      date
    });

    await exp.save();

    // compute budget for that month
    const monthStart = new Date(date);
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);

    // aggregate total including new expense
    const agg = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          category: categoryId,
          date: { $gte: monthStart, $lt: monthEnd }
        }
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const spent = agg[0]?.total || 0;

    const budget = await Budget.findOne({
      user: req.user._id,
      category: categoryId,
      month: monthStart.toISOString().slice(0, 7)
    });

    const limit = budget ? budget.limit : null;
    const withinBudget = limit === null ? true : spent <= limit;

    res.json({ expense: exp, withinBudget, spent, limit });

  } catch (err) {
    next(err);
  }
};


export const listExpenses = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const q = { user: req.user._id };

    if (from || to) q.date = {};
    if (from) q.date.$gte = new Date(from);
    if (to) q.date.$lte = new Date(to);

    const exps = await Expense.find(q)
      .populate('category')
      .sort({ date: -1 });

    res.json(exps);

  } catch (err) {
    next(err);
  }
};
