import AdminBookService from "../../services/book/AdminBookService.js"; // Assuming AdminBookService.js in same directory
const adminBookService = new AdminBookService();

class BookController {
  constructor() {
  }
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
}

export default BookController;
