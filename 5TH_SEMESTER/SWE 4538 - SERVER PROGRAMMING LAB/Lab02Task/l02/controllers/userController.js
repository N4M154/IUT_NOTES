const path = require("path");
const {
  ensureWatchlistFileExists,
  readUsers,
  saveUsers,
  readMovies,
  saveUserGenres,
  readUserFavorites,
  readWatchlist,
  updateWatchlist,
  saveReview,
  readReviews,
  deleteReview,
  deleteUser,
  deleteUserReviews,
  deleteUserWatchlist,
} = require("../middleware/Functions.js");
// Show the homepage
exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
};

// Show the signup page
exports.getSignupPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "signup.html"));
};

// Handle user signup
exports.postSignup = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Check if username already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.send("Username already exists. Please choose another one.");
  }

  // Save new user
  users.push({ username, password });
  saveUsers(users);
  res.send('Registration successful! You can now <a href="/login">login</a>.');
};

// Show the login page
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
};

// Handle user login
exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Check if username and password match
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // After login, render the movies page with the movie list
    const movies = readMovies();
    const reviews = readReviews(); // Get all reviews for movies
    res.render("movies", { movies, reviews, username, genreFilter: "" });
  } else {
    res.send(
      'Invalid username or password. Please try again. <a href="/login" style="color: #FF0000; ">login</a>.'
    );
  }
};

// Handle filtering of movies by genre
exports.postFilterMovies = (req, res) => {
  const { genre } = req.body;
  const { username } = req.body;

  // Read all movies
  let movies = readMovies();
  const reviews = readReviews(); // Get all reviews for movies

  // Filter movies by the selected genre if it's provided
  if (genre && genre !== "all") {
    movies = movies.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  // Render the movie list again, filtered by the selected genre
  res.render("movies", { movies, reviews, username, genreFilter: genre });
};

// Handle saving favorite genres
exports.saveFavoriteGenres = (req, res) => {
  const { username } = req.body;
  let genres = req.body.genres || [];

  // Normalize genres to be an array (even if only one genre is selected)
  if (!Array.isArray(genres)) {
    genres = [genres]; // Convert to an array if it's a single string
  }

  if (genres.length > 0) {
    saveUserGenres(username, genres);
    res.send(
      'Favorite genres and corresponding movies saved successfully! <a href="/filter-movies?username=' +
        username +
        '">Back to Movies</a>'
    );
  } else {
    res.send("Please select at least one genre.");
  }
};

// Show the profile page (display favorite genres/movies, watchlist, and reviews)
exports.getProfilePage = (req, res) => {
  const { username, genreFilter = "all" } = req.query;
  const users = readUsers();
  const user = users.find((u) => u.username === username);

  if (user) {
    let favoriteMovies = readUserFavorites(username);

    // Apply genre filter if provided
    if (genreFilter !== "all") {
      favoriteMovies = favoriteMovies.filter(
        (movie) => movie.genre === genreFilter
      );
    }

    const { watchedMovies, planToWatchMovies } = readWatchlist(username);
    const reviews = readReviews();

    res.render("profile", {
      username: user.username,
      favoriteMovies,
      watchedMovies,
      planToWatchMovies,
      reviews,
    });
  } else {
    res.send("User not found");
  }
};

// Handle the watchlist form submission
exports.handleWatchlist = (req, res) => {
  const { username, movieName, action } = req.body;
  updateWatchlist(username, movieName, action);
  res.redirect(`/profile?username=${username}`);
};

// Handle posting a review
exports.postReview = (req, res) => {
  const { username, movieName, review } = req.body;

  if (review.trim().length > 0) {
    saveReview(username, movieName, review);
    res.redirect(`/profile?username=${username}`);
  } else {
    res.send("Review cannot be empty.");
  }
};

// Show the movies page with reviews for each movie
exports.getMoviesPage = (req, res) => {
  const movies = readMovies(); // Read all movies
  const reviews = readReviews(); // Read all reviews

  // Pass movies and reviews to the movies page
  const { username } = req.query;
  res.render("movies", { movies, reviews, username, genreFilter: "all" });
};

// Handle deleting a review
exports.deleteReview = (req, res) => {
  const { username, movieName, reviewText } = req.body;

  // Call helper function to delete the review
  deleteReview(username, movieName, reviewText);

  // Redirect back to the profile or movies page
  res.redirect(req.headers.referer || "/profile?username=" + username);
};

// Handle deleting user profile and associated data
exports.deleteProfile = (req, res) => {
  const { username } = req.body;

  // Delete user profile, reviews, and watchlist
  deleteUser(username);
  deleteUserReviews(username);
  deleteUserWatchlist(username);

  // After deletion, redirect to home or signup page
  res.redirect("/");
};

// Export the function to read movies
exports.readMovies = readMovies;
