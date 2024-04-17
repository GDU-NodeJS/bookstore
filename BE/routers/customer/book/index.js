
import { Router } from "express";
import BookController from "../../../controllers/book/AdminBookController.js";

const book = Router();
const bookController = new BookController();
book.get('/getAll', bookController.getBooks.bind(bookController));

export default book;
