import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reactionType: {
    type: String,
    enum: ["funny", "creative", "love", "sad", "angry"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: { type: String, required: true },
    category: {
      type: String,
      enum: ["anime", "movie", "tv show", "music", "book"],
      required: true,
    },
    workName: { type: String, required: true },
    review: { type: String, required: true },
    datePosted: { type: Date, default: Date.now },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
reviewSchema.index({ category: 1, datePosted: -1 });
reviewSchema.index({ author: 1 });

export default mongoose.model("Review", reviewSchema);
