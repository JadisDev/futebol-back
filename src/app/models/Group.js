import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
  {
    name_group: {
      type: String,
      min: 3,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Group', GroupSchema);
