import express from "express";
import multer from "multer";
import {
  createPet,
  getPetStats,
  feedPet,
  playWithPet,
  releasePet,
} from "../controllers/petController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Create a new pet
router.post("/pets", upload.array("images", 2), createPet);

// View pet stats
router.get("/pets/:id", getPetStats);

// Feed pet
router.put("/pets/:id/feed", feedPet);

// Play with pet
router.put("/pets/:id/play", playWithPet);

// Release pet
router.delete("/pets/:id", releasePet);

export default router;
