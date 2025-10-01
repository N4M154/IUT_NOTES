import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookModel from "./BookModel.js";
import userModel from "./UserModel.js";

const app = express();
app.use(cors());
app.use(express.json());

//books
app.post("/book", (req, res) => {
  const bk = req.body;
  bookModel
    .create(bk)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.get("/book", (req, res) => {
  bookModel
    .find()
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching books");
    });
});

app.put("/book/:id", (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;

  bookModel
    .findByIdAndUpdate(bookId, updateData, { new: true, runValidators: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.send("Book not found");
      }
      res.json(updatedBook);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error updating book");
    });
});

app.delete("/book/:id", (req, res) => {
  const bookId = req.params.id;

  bookModel
    .findByIdAndDelete(bookId)
    .then((deletedBook) => {
      if (!deletedBook) {
        return res.send("Book not found");
      }
      res.send("Book deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      res.send("Error deleting book");
    });
});

//users
app.post("/user", (req, res) => {
  const usr = req.body;
  userModel
    .create(usr)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.get("/user", (req, res) => {
  userModel
    .find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching users");
    });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  userModel
    .findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.send("User not found");
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error updating user");
    });
});

app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;

  userModel
    .findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.send("user not found");
      }
      res.send("user deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      res.send("Error deleting user");
    });
});

app.listen(3001, () => {
  console.log("server running");
});

mongoose.connect("").then(() => {
  console.log("mongodb connected");
});
