const express = require("express");
const router = require("./Routes/user.route");

const app = express();

//middlewares
app.use(express.json()); //in raw.if I don't give this it will show error in postman because we have to explicitely say we are accepting json files only
app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded

app.use(router);
app.get("/", (req, res) => {
  res.send("Hello");
});

//in postman: http://localhost:4000/users/4
// app.post("/users/:id", (req, res) => {
//   const userID = req.params.id; //param's id must be the same as :id. those names must match
//   res.send(`user ID: ${userID}`);
// });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
