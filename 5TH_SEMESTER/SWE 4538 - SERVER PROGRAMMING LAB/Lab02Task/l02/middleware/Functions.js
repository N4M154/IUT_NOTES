const fs = require("fs");
const path = require("path");

// File paths for users, movies, reviews, and watchlists
const USERS_FILE = path.join(__dirname, "../data/users.txt");
const MOVIES_FILE = path.join(__dirname, "../data/movies.txt");
const USER_GENRES_FILE = path.join(__dirname, "../data/user_genres.txt");
const WATCHLIST_FILE = path.join(__dirname, "../data/watchlist.txt");
const REVIEWS_FILE = path.join(__dirname, "../data/reviews.txt");

// Ensure the watchlist file exists
function ensureWatchlistFileExists() {
  if (!fs.existsSync(WATCHLIST_FILE)) {
    fs.writeFileSync(WATCHLIST_FILE, "", "utf8");
  }
}

// Helper function to read users from the file
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to save users to the file
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Helper function to read movies from the file
function readMovies() {
  try {
    const data = fs.readFileSync(MOVIES_FILE, "utf8");
    const movies = data
      .split("\n")
      .map((line) => {
        const [name, director, releaseDate, genre] = line.split(",");
        if (name && director && releaseDate && genre) {
          return {
            name: name.trim(),
            director: director.trim(),
            releaseDate: releaseDate.trim(),
            genre: genre.trim(),
          };
        }
        return null;
      })
      .filter((movie) => movie !== null); // Filter out invalid entries
    return movies;
  } catch (err) {
    return [];
  }
}

// Helper function to save user-selected genres and movies
function saveUserGenres(username, genres) {
  const movies = readMovies();

  // Filter movies based on selected genres
  const selectedMovies = movies.filter((movie) =>
    genres.includes(movie.genre.trim())
  );

  // Prepare the data to be written to the file
  const userData = {
    username,
    genres,
    movies: selectedMovies,
  };

  // Write the data to the file (overwrite existing entry for the user)
  let data = fs
    .readFileSync(USER_GENRES_FILE, "utf8")
    .split("\n")
    .filter((line) => line);
  data = data.filter((line) => {
    const record = JSON.parse(line);
    return record.username !== username; // Remove any existing entry for the user
  });

  data.push(JSON.stringify(userData));
  fs.writeFileSync(USER_GENRES_FILE, data.join("\n"), "utf8");
}

// Helper function to read favorite genres and movies for a user
function readUserFavorites(username) {
  try {
    const data = fs.readFileSync(USER_GENRES_FILE, "utf8").split("\n");
    const userData = data
      .map((line) => JSON.parse(line))
      .find((user) => user.username === username);

    if (userData) {
      return userData.movies;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

// Helper function to read watchlist from a file
function readWatchlist(username) {
  ensureWatchlistFileExists(); // Ensure the file exists
  try {
    const data = fs
      .readFileSync(WATCHLIST_FILE, "utf8")
      .split("\n")
      .filter((line) => line);
    const userData = data
      .map((line) => JSON.parse(line))
      .find((user) => user.username === username);

    if (userData) {
      return {
        watchedMovies: userData.watchedMovies || [],
        planToWatchMovies: userData.planToWatchMovies || [],
      };
    } else {
      return { watchedMovies: [], planToWatchMovies: [] };
    }
  } catch (err) {
    return { watchedMovies: [], planToWatchMovies: [] };
  }
}

// Helper function to update watchlist in the file
function updateWatchlist(username, movieName, action) {
  ensureWatchlistFileExists(); // Ensure the file exists
  let data = fs
    .readFileSync(WATCHLIST_FILE, "utf8")
    .split("\n")
    .filter((line) => line);
  let userData = data
    .map((line) => JSON.parse(line))
    .find((user) => user.username === username);

  // If the user doesn't have a watchlist yet, create a new entry
  if (!userData) {
    userData = { username, watchedMovies: [], planToWatchMovies: [] };
  }

  // Update the watchlist based on the action
  if (action === "watched") {
    if (!userData.watchedMovies.includes(movieName)) {
      userData.watchedMovies.push(movieName);
    }
  } else if (action === "plan-to-watch") {
    if (!userData.planToWatchMovies.includes(movieName)) {
      userData.planToWatchMovies.push(movieName);
    }
  }

  // Overwrite the user data in the file
  data = data.filter((line) => {
    const record = JSON.parse(line);
    return record.username !== username;
  });
  data.push(JSON.stringify(userData));
  fs.writeFileSync(WATCHLIST_FILE, data.join("\n"), "utf8");
}

// Helper function to save a review to the file
function saveReview(username, movieName, reviewText) {
  const review = {
    username,
    movieName,
    reviewText,
    date: new Date().toISOString(),
  };

  // Append the new review to the file
  fs.appendFileSync(REVIEWS_FILE, JSON.stringify(review) + "\n", "utf8");
}

// Helper function to read reviews from the file
function readReviews() {
  try {
    const data = fs
      .readFileSync(REVIEWS_FILE, "utf8")
      .split("\n")
      .filter((line) => line);
    const reviews = data.map((line) => JSON.parse(line));

    // Structure reviews by movie name
    const reviewsByMovie = {};
    reviews.forEach((review) => {
      if (!reviewsByMovie[review.movieName]) {
        reviewsByMovie[review.movieName] = [];
      }
      reviewsByMovie[review.movieName].push({
        username: review.username,
        text: review.reviewText,
      });
    });

    return reviewsByMovie;
  } catch (err) {
    return {};
  }
}
function deleteReview(username, movieName, reviewText) {
  let data = fs
    .readFileSync(REVIEWS_FILE, "utf8")
    .split("\n")
    .filter((line) => line);
  data = data.filter((line) => {
    const review = JSON.parse(line);
    // Filter out the review that matches the username, movie name, and review text
    return !(
      review.username === username &&
      review.movieName === movieName &&
      review.reviewText === reviewText
    );
  });
  fs.writeFileSync(REVIEWS_FILE, data.join("\n"), "utf8");
}
// Helper function to delete user from users file
function deleteUser(username) {
  let users = readUsers();
  users = users.filter((user) => user.username !== username);
  saveUsers(users);
}

// Helper function to delete user's reviews from the reviews file
function deleteUserReviews(username) {
  let reviews = fs
    .readFileSync(REVIEWS_FILE, "utf8")
    .split("\n")
    .filter((line) => line);
  reviews = reviews.filter((review) => {
    const reviewObj = JSON.parse(review);
    return reviewObj.username !== username;
  });
  fs.writeFileSync(REVIEWS_FILE, reviews.join("\n"), "utf8");
}

// Helper function to delete user's watchlist
function deleteUserWatchlist(username) {
  let watchlists = fs
    .readFileSync(WATCHLIST_FILE, "utf8")
    .split("\n")
    .filter((line) => line);
  watchlists = watchlists.filter((watchlist) => {
    const watchlistObj = JSON.parse(watchlist);
    return watchlistObj.username !== username;
  });
  fs.writeFileSync(WATCHLIST_FILE, watchlists.join("\n"), "utf8");
}

module.exports = {
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
};
