import Book from '../models/Book.js';

class BookRepository {
  constructor() {
  }

  async findAll(){
    const books = await Book.find(); // Find all
    return books;
  }

  async findByName(name) {
    try {
      const book = await this.book.findOne({ name }); // Find by name
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by name'); // Re-throw for handling
    }
  }

  async findById(id) {
    try {
      const book = await this.book.findById(id); // Find by ID (cast to ObjectId)
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by ID'); // Re-throw for handling
    }
  }

  // Add other methods as needed (e.g., findByAuthor, findByGenre)
  async findByAuthor(author) {
    try {
      const books = await this.book.find({ author }); // Find by author
      return books;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding books by author'); // Re-throw for handling
    }
  }
}

export default BookRepository;
