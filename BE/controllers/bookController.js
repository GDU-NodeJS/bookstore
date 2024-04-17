import BookService from '../services/BookService.js';


class BookController {
  constructor() {
    this._bookService = new BookService();
  }

  async getBooks(req, res) {
    try {
         // Tạo một thể hiện của BookService
        const books = await this._bookService.getAllBooks(); 
        return res.status(200).json({
          status: 200,
          message: "Successfully retrieved data",
          data: books
        });
    } catch (err) {
        console.error('Error fetching books:', err);
        return res.status(500).send('Error retrieving books');
    }
  }
}

export default BookController;
