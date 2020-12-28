import mongoose from 'mongoose';

const GroupUserSchema = new mongoose.Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    group: mongoose.Schema.Types.ObjectId,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('GroupUser', GroupUserSchema);
