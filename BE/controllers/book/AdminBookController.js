import AdminBookService from "../../services/book/AdminBookService.js"; // Assuming AdminBookService.js in the same directory
const adminBookService = new AdminBookService();

class AdminBookController {
  constructor() {}

  async getBooks(req, res) {
    try {
      const books = await adminBookService.getAllBooks();
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved data",
        data: books,
      });
    } catch (err) {
      console.error('Error fetching books:', err);
      return res.status(500).send('Error retrieving books');
    }
  }

  async getBookById(req, res) {
    try {
      const bookId = req.params.id;
      const book = await adminBookService.findById(bookId);
      if (!book) {
        return res.status(404).json({
          status: 404,
          message: "Book not found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved the book",
        data: book,
      });
    } catch (err) {
      console.error('Error fetching the book:', err);
      return res.status(500).send('Error retrieving the book');
    }
  }

  async addBook(req, res) {
    try {
      const newBook = req.body; // Assuming request body contains the new book data
      await adminBookService.addBook(newBook);
      return res.status(201).json({
        status: 201,
        message: "Book added successfully",
      });
    } catch (err) {
      console.error('Error adding the book:', err);
      return res.status(500).send('Error adding the book');
    }
  }

  async updateBook(req, res) {
    try {
      const bookId = req.params.id;
      const updatedBook = req.body; // Assuming request body contains the updated book data
      await adminBookService.updateBook(bookId, updatedBook);
      return res.status(200).json({
        status: 200,
        message: "Book updated successfully",
      });
    } catch (err) {
      console.error('Error updating the book:', err);
      return res.status(500).send('Error updating the book');
    }
  }

  async removeBook(req, res) {
    try {
      const bookId = req.params.id;
      await adminBookService.removeBook(bookId);
      return res.status(200).json({
        status: 200,
        message: "Book removed successfully",
      });
    } catch (err) {
      console.error('Error removing the book:', err);
      return res.status(500).send('Error removing the book');
    }
  }
}

export default AdminBookController;
