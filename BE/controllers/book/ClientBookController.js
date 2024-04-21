import AdminBookService from "../../services/book/AdminBookService.js"; // Assuming AdminBookService.js in the same directory
const adminBookService = new AdminBookService();

class ClientBookController {
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
        return res.status(500).json({
            status: 500,
            message: "Error retrieving the book",
            data: err,
        })
    }
  }

  async getBookById(req, res) {
    try {
      const bookId = req.params.id;
      const book = await adminBookService.findById(bookId);
    //   if (book.$isEmpty) {
    //     return res.status(404).json({
    //       status: 404,
    //       message: "Book not found",
    //     });
    //   }
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved the book",
        data: book,
      });
    } catch (err) {
      return res.status(404).json({
        status: 404,
        message: "Book not found",
        data: err,
      })
    }
  }
}

export default ClientBookController;
