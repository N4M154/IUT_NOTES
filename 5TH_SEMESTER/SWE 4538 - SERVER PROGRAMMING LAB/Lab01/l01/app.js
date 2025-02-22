const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/manga", (req, res) => {
  res.sendFile(path.join(__dirname, "manga.html"));
});

app.get("/anime", (req, res) => {
  res.sendFile(path.join(__dirname, "anime.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
