import { Router } from "express";
import ClientBookController from "../../../controllers/book/ClientBookController.js";

const book = Router();
const bookController = new ClientBookController();
book.get('/getAll', bookController.getBooks.bind(bookController))
book.get('/:id', bookController.getBookById.bind(bookController));

export default book;