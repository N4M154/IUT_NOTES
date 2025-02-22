const fs = require("fs");

const postUserInfo = (req, res) => {
  const username = req.body.username; //req.body.username username has to match the body of the request in postman
  const pass = req.body.password;
  res.send(`user name: ${username}`);
  fs.writeFile("./Demo.txt", `${username}`, (e) => {
    if (e) console.log(e);
    else console.log("successful");
  });

  res.send(`${username}`);
};

const postUserInterest = (req, res) => {
  const interest = "sleep";
  fs.appendFile("../Demo.txt", `\n ${interest}`, (error) => {
    if (error) {
      console.error("failed to append: ", error);
      res.status(500).send("error saving file");
    } else {
      console.log("successful");
      res.send(interest);
    }
  });
};
module.exports = { postUserInfo, postUserInterest };
