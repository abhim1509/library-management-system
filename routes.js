import { Router } from "express";
import {
  borrowBook,
  returnBook,
} from "./src/controllers/transaction.controller.js";
import {
  addBook,
  getBookDetails,
  getBooksList,
} from "./src/controllers/book.controller.js";
const router = Router();

router.post("/borrow", borrowBook);
router.get("/return", returnBook);

router.get("/book", getBooksList);
router.post("/book", addBook);

router.get("/book/:bookId", getBookDetails);
export default router;
