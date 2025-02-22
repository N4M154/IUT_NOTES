const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const routes = require("./routes");
const ensureAuthenticated = require("./middleware");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "secret", //A string to sign session IDs for security.
    resave: false, // Avoids resaving a session if nothing haschanged.
    saveUninitialized: false, //Avoid saving uninitialized sessions (sessions without data).
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true, // Allow cookies to be sent
  })
);

app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});
app.get("/welcome", ensureAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/views/homePage.html");
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
