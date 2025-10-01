const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { addUser } = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
require("./config/passport")(passport);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  addUser({ username, password: hashed });
  res.send("User registered");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("Logged in");
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send("Access granted");
  }
  res.sendStatus(401);
});

app.listen(3000);
