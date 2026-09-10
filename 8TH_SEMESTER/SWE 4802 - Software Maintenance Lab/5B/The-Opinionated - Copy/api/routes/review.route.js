import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  addReaction,
  getUserReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Review CRUD operations
router.post("/reviews", createReview);
router.get("/reviews", getReviews);
router.get("/reviews/:id", getReviewById);
router.get("/user/reviews", getUserReviews);
router.delete("/reviews/:id", deleteReview);

// Reaction operations
router.post("/reviews/:reviewId/reactions", addReaction);

export default router;
