import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  bookTitle: { type: String, required: true },
  copies: { type: Number, required: true, default: 1 },
});

export const BookTransactions = mongoose.model("book", bookSchema);
