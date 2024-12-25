import mongoose from "mongoose";

const bookTransactionsSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
  dateBorrowed: { type: Date, default: Date.now },
  isReturned: { type: Boolean, default: false },
});

export const BookTransactions = mongoose.model(
  "book-transactions",
  bookTransactionsSchema
);
