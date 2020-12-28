import mongoose from 'mongoose';

const SeasonSchema = new mongoose.Schema(
  {
    group_user: mongoose.Schema.Types.ObjectId,
    name_season: {
      type: String,
      min: 3,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    closedAt: {
      type: Date
    },
  },
  { timestamps: true }
);

export default mongoose.model('Season', SeasonSchema);
