import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  month: { type: String, required: true }, // format YYYY-MM (e.g., 2025-06)
  limit: { type: Number, required: true, min: 0 }
}, { timestamps: true });

budgetSchema.index({ user:1, category:1, month:1 }, { unique: true });

export default mongoose.model('Budget', budgetSchema);
