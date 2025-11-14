import Expense from '../models/Expense.js';
import Budget from '../models/Budget.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

export const monthlyReport = async (req, res, next) => {
  try {
    const { month } = req.query; // YYYY-MM
    if (!month) return res.status(400).json({ message: "month is required" });

    const [y, m] = month.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);

    // aggregate spent per category
    const agg = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          date: { $gte: start, $lt: end }
        }
      },
      { $group: { _id: "$category", spent: { $sum: "$amount" } } }
    ]);

    const spentMap = {};
    agg.forEach(a => {
      spentMap[a._id.toString()] = a.spent;
    });

    const categories = await Category.find({ user: req.user._id });
    const budgets = await Budget.find({ user: req.user._id, month });

    const budgetMap = {};
    budgets.forEach(b => {
      budgetMap[b.category.toString()] = b.limit;
    });

    const result = categories.map(c => {
      const cid = c._id.toString();
      const spent = spentMap[cid] || 0;
      const limit =
        budgetMap[cid] !== undefined ? budgetMap[cid] : null;

      return {
        category: c,
        spent,
        limit,
        remaining: limit == null ? null : limit - spent
      };
    });

    res.json({ month, data: result });
  } catch (err) {
    next(err);
  }
};
