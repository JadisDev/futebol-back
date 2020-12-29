import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema(
  {
    gol: {
      type: Number,
      required: true,
    },
    victory: {
      type: Number,
      required: true,
    },
    assistance: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
    },
    groupUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupUser"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Game', GameSchema);
