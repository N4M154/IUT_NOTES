const User = require("../dataModels/User.model");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");

// const users = []; // store the user info here

// const initializePassport = require("../config/passport");
// initializePassport(
//   passport, 
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
//   );

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
  // try {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10); // req.body.password ==> password should be exact match to register.html name=password,  10:how many time you want to generate hash. it's a standard default value
  //   users.push({
  //     id: Date.now().toString(),
  //     name: req.body.username ,
  //     email: req.body.email,
  //     password: hashedPassword,
  //   });

  //   res.redirect("/login");
  // } catch{
  //   res.redirect("/register");
  // }
  // console.log(users); // show the user list

  const {  email, password } = req.body;
const name= req.body.username

  console.log(name)
  console.log(email)
  console.log(password)

const errors=[]
if (!name || !email || !password ) {
  errors.push("All fields are required!");
}

if (errors.length > 0) {
  res.status(400).json({ error: errors });
} else {
  //Create New User
  User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push("User already exists with this email!");
      res.status(400).json({ error: errors });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          errors.push(err);
          res.status(400).json({ error: errors });
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              errors.push(err);
              res.status(400).json({ error: errors });
            } else {
              const newUser = new User({
                name,
                email,
                password: hash,
              });
              newUser
                .save()
                .then(() => {
                  res.redirect("/login");
                })
                .catch(() => {
                  errors.push("Please try again");
                  res.status(400).json({ error: errors });
                });
            }
          });
        }
      });
    }
  });
}
};

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};

