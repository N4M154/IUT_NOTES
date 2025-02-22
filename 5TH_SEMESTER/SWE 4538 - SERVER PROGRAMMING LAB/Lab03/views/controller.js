const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const fs = require("fs");

//json file
const usersFilePath = path.join(__dirname, "user.json");

// json theke porar jonno
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data); // Parse JSON data
  } catch (err) {
    throw new Error("Error reading users file: " + err.message);
  }
};

//json a user save
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 1), "utf8");
};

const initializePassport = require("./passport.js");
initializePassport(
  passport,
  (email) => readUsers().find((user) => user.email === email),
  (id) => readUsers().find((user) => user.id === id)
);

const getLogin = (req, res) => {
  const filePath = path.join(__dirname, "views", "login.html");
  res.sendFile(filePath);
};

const getRegister = (req, res) => {
  const filePath = path.join(__dirname, "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    let users = readUsers();

    if (!Array.isArray(users)) {
      users = [];
    }

    users.push(newUser);

    saveUsers(users);

    res.redirect("/login");
  } catch (error) {
    console.error("Error during registration:", error);
    res.redirect("/register");
  }
};

// Handle user login
const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

module.exports = { getLogin, postLogin, getRegister, postRegister };
