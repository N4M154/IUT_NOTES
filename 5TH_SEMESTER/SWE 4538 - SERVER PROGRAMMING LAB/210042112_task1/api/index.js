import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();

const app = express();

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // timestamp to avpid overwriting
  },
});
const upload = multer({ storage });

app.use(
  cors({
    origin: ["http://localhost:5173", "https://localhost:5173"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO) //in the dotenv file add mongodb uri
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", petRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
