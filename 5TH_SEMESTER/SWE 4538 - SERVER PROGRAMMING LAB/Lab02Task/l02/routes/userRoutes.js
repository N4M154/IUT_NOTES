const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Home route
router.get("/", userController.getHomePage);

// Signup routes
router.get("/signup", userController.getSignupPage);
router.post("/signup", userController.postSignup);

// Login routes
router.get("/login", userController.getLoginPage);
router.post("/login", userController.postLogin);

router.post("/delete-profile", userController.deleteProfile);

// Filter movies by genre (POST - for filtering)
router.post("/filter-movies", userController.postFilterMovies);

// Show all movies with reviews (GET - for displaying all movies and their reviews)
router.get("/filter-movies", userController.getMoviesPage);

// Save favorite genres
router.post("/save-favorite-genres", userController.saveFavoriteGenres);

// Handle watchlist (watched/plan to watch)
router.post("/watchlist", userController.handleWatchlist);

// Profile route
router.get("/profile", userController.getProfilePage);

// Post a review for a watched movie
router.post("/post-review", userController.postReview);

// Delete a review for a movie
router.post("/delete-review", userController.deleteReview);

module.exports = router;
