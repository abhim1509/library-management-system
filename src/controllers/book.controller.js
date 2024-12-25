import { v4 as uuidv4 } from "uuid";
import { Book } from "../models/book.model.js";

export const addBook = async (req, res) => {
  const { bookTitle, copies } = req.body;
  try {
    if (!bookTitle || copies <= 0) {
      return res.status(400).json({ data: false, message: "Invalid payload" });
    }

    let payload = {
      bookTitle,
      bookId: uuidv4(),
    };

    if (copies) {
      payload.copies = copies;
    }
    const bookResponse = Book.create(payload);

    if (!bookResponse) {
      throw new Error(bookResponse);
    }

    res.status(200).json("Book details saved successfully.");
  } catch (error) {
    res.status(500).json("Something went wrong");
    console.log(error);
  }
};

export const getBookDetails = async () => {};

export const getBooksList = async () => {};
