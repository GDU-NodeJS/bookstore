import ClientBookSerivce from "../../services/book/ClientBookService.js"; // Assuming clientBookService.js in the same directory
const clientBookService = new ClientBookSerivce();

class ClientBookController {
  constructor() {}

  async getBooks(req, res) {
    try {
      const books = await clientBookService.getAllBooks();
      const response = books.map(book => this.responseBook(book));
      return res.status(res.statusCode).json({
        status: res.statusCode,
        message: "Successfully retrieved data",
        data: response,
      });
    } catch (err) {
      let errorMessage = err.message;
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.slice(7);
        }
      return res.status(res.statusCode).json({
          status: res.statusCode,
          message: errorMessage
      })
    }
  }

  async getBookById(req, res) {
    try {
      const bookId = req.params.id;
      const book = await clientBookService.findById(bookId);
      return res.status(res.statusCode).json({
        status: res.statusCode,
        message: "Successfully retrieved the book",
        data: book,
      });
    } catch (err) {
      let errorMessage = err.message;
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.slice(7);
        }
      return res.status(res.statusCode).json({
          status: res.statusCode,
          message: errorMessage
      })
    }
  }
  responseBook(book){
    const categories = book.categories.map(category => category.name);
    return {
      id: book._id,
      price: book.price,
      image: book.image,
      name: book.name,
      author: book.author,
      description: book.description,
      categories: categories
    };
  }
}

export default ClientBookController;
