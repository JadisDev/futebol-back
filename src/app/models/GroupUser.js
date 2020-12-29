import mongoose from 'mongoose';

const GroupUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

export default mongoose.model('GroupUser', GroupUserSchema);
