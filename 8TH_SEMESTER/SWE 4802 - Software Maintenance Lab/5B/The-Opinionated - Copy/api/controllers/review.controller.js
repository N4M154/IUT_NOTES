import Review from "../models/review.model.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { category, workName, review, authorName } = req.body;
    const userId = req.user.id; // From auth middleware

    const newReview = new Review({
      author: userId,
      authorName,
      category,
      workName,
      review,
    });

    const savedReview = await newReview.save();

    // // Populate author info for response
    // await savedReview.populate("author", "email");

    res.status(201).json({
      success: true,
      data: savedReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Get all reviews with optional filtering
export const getReviews = async (req, res) => {
  try {
    const { category, reactionType, page = 1, limit = 10 } = req.query;

    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by reaction type if provided
    if (reactionType) {
      query["reactions.reactionType"] = reactionType;
    }

    const skip = (page - 1) * limit;

    const reviews = await Review.find(query)
      // .populate("author", "email")
      .sort({ datePosted: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      data: reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalReviews: total,
        hasNext: skip + reviews.length < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    // .populate("author", "email");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

// Add or update reaction to a review
export const addReaction = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reactionType } = req.body;
    const userId = req.user.id;

    if (!["funny", "creative", "love", "sad", "angry"].includes(reactionType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reaction type",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Remove existing reaction from this user if any
    review.reactions = review.reactions.filter(
      (reaction) => reaction.userId.toString() !== userId
    );

    // Add new reaction
    review.reactions.push({
      userId,
      reactionType,
    });

    await review.save();

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Error adding reaction:", error);
    res.status(500).json({
      success: false,
      message: "Error adding reaction",
      error: error.message,
    });
  }
};

// Get user's own reviews
export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ author: userId })
      .populate("author", "email")
      .sort({ datePosted: -1 });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user reviews",
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the review first to verify ownership
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if the requesting user is the author
    if (review.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};
