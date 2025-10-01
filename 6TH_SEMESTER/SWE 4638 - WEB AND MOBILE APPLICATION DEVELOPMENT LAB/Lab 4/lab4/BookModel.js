import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publishedYear: { type: Number, required: true },
    genre: { type: String, required: true },
    availableCopies: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true, 
  }
);

const BookModel = mongoose.model("Book", bookSchema);
export default BookModel;
