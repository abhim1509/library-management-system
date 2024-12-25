import { Router } from "express";
import { borrowBook, returnBook } from "./controllers/book-transactions";
import {
  addBook,
  getBookDetails,
  getBooksList,
} from "./src/controllers/book.controller";
const router = Router();

router.post("/borrow", borrowBook);
router.get("/return", returnBook);

router.get("/book", getBooksList);
router.post("/book", addBook);

router.get("/book/:bookId", getBookDetails);
export default router;
