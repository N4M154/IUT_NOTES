import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "./models/User.model.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.post("/users", async (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      res.status(201).json({
        message: "User created successfully",
        user: user,
      });
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({
        message: "Error creating user",
        error: err.message,
      });
    });
});

app.get("/users", async (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({
        message: "Error fetching users",
        error: err.message,
      });
    });
});

app.listen(PORT, () => {
  console.log("Server is ready", PORT);
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
