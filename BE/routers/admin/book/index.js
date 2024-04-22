import { Router } from "express";
import AdminBookController from "../../../controllers/book/AdminBookController.js";

const adminBook = Router();
const adminBookController = new AdminBookController();

adminBook.get("/getAll", adminBookController.getBooks);
adminBook.get("/:id", adminBookController.getBookById);
adminBook.post("/add", adminBookController.addBook);
adminBook.put("/update/:id", adminBookController.updateBook);
adminBook.delete("/delete/:id", adminBookController.removeBook);

export default adminBook;