import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    enum: ["Bunny", "Puppy", "Dragon"], // List of species.for my convinience I added the 3 given in the task description
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String, //in the upload folder
    },
  ],
  stats: {
    //initial stats
    hunger: { type: Number, default: 30 },
    energy: { type: Number, default: 50 },
    health: { type: Number, default: 100 },
  },
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
