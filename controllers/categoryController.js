import Category from '../models/Category.js';
import { validationResult } from 'express-validator';

export const listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ user: req.user._id }).sort('name');
    res.json(categories);
  } catch (err) { next(err); }
}

export const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, color } = req.body;
    const cat = new Category({ user: req.user._id, name, color });
    await cat.save();
    res.json(cat);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Category with that name already exists' });
    next(err);
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = await Category.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
    if (!cat) return res.status(404).json({ message: 'Not found' });
    res.json(cat);
  } catch (err) { next(err); }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = await Category.findOneAndDelete({ _id: id, user: req.user._id });
    if (!cat) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}
