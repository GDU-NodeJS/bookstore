import Book from '../models/Book.js';

class BookRepository {
  constructor() {
  }

  async findAll(){
    const books = await Book.find();
    return books;
  }

  async findByName(name) {
    try {
      const book = await Book.findOne({ name });
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by name');
    }
  }

  async findById(id) {
    try {
      const book = await Book.findById(id); 
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by ID'); 
    }
  }

  async findByAuthor(author) {
    try {
      const books = await Book.find({ author }); 
      return books;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding books by author'); 
    }
  }
}

export default BookRepository;
