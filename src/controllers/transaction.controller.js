import mongoose from "mongoose";
import { acquireLock, releaseLock } from "../utility/locks.js";
import { BookTransactions } from "../models/transaction.model.js";
import { Book } from "../models/book.model.js";
export const borrowBook = async (req, res) => {
  const { bookId, userId } = req.body;

  await acquireLock(bookId);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    if (!bookId || !userId) {
      return res.status(400).json({ data: false, message: "Invalid payload" });
    }
    const bookDetails = await Book.findOne({ bookId }).session(session);

    if (!bookDetails || !bookDetails.copies <= 0) {
      await session.abortTransaction();
      return res.status(404).json({ data: false, message: "Book not found" });
    }

    bookDetails.copies -= 1;
    bookDetails.save({ session });

    const transaction = BookTransactions.create({ bookId, userId });
    transaction.save({ session });

    await session.commitTransaction();
    res.status(200).json({ data: true, message: "Book issued successfully." });
    session.endSession();
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: false, message: "Something went wrong" });
  } finally {
    await releaseLock(bookId);
  }
};

export const returnBook = async (req, res) => {
  const { bookId, userId } = req.body;

  await acquireLock(bookId);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    if (!bookId || !userId) {
      return res.status(400).json({ data: false, message: "Invalid payload" });
    }
    const bookDetails = await Book.findOne({
      bookId,
      userId,
    }).session(session);

    if (!bookDetails) {
      await session.abortTransaction();
      return res.status(404).json({ data: false, message: "Book not found" });
    }

    bookDetails.copies += 1;
    bookDetails.save({ session });

    const transaction = await BookTransactions.findOne({
      bookId,
      userId,
      isReturned: false,
    });

    transaction.isReturned = true;
    transaction.save({ session });

    await session.commitTransaction();
    res
      .status(200)
      .json({ data: true, message: "Book returned successfully." });
    session.endSession();
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: false, message: "Something went wrong" });
  } finally {
    await releaseLock(bookId);
  }
};
