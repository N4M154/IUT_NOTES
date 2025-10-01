const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

const SECRET = "my_jwt_secret";
const users = [];

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.send("User registered");
});

// Login - issue token
app.post("/login", async (req, res) => {
  const user = users.find((u) => u.username === req.body.username);
  if (!user) return res.sendStatus(401);
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.sendStatus(403);

  const token = jwt.sign({ username: user.username }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware to verify token
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.send(`Hello ${req.user.username}, you have access!`);
});

app.listen(3000);
