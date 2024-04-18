import { Router } from "express";
import BookController from "../../../controllers/BookController.js";

const Admin = Router();
const bookController = new BookController();
Admin.get('/book/getAll', bookController.getBooks.bind(bookController));
Admin.get('/book', bookController.getBooks.bind(bookController));


Admin.post('/book/create', bookController.addBook.bind(bookController));

export default Admin