import Book from '../models/Book.js';

class BookRepository {
  constructor() {}

  async create(bookData) {
    try {
      const newBook = new Book(bookData);
      const book = await newBook.save();
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error creating book');
    }
  }

  async findAll() {
    const books = await Book.find().populate({
      path: 'categories',
      select: '-__v'
    }); 
    return books;
  }

  async findByName(name) {
    try {
      const book = await Book.findOne({ name }).populate('categories'); // Populate categories
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by name');
    }
  }

  async findById(id) {
    try {
      const book = await Book.findById(id).populate('categories'); // Populate categories
      if (!book) {
        return null;
      }
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by id');
    }
  }

  async findByAuthor(author) {
    try {
      const books = await Book.find({ author }).populate('categories'); // Populate categories
      return books;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding books by author');
    }
  }

  async addCategory(bookId, categoryId) {
    try {
      const book = await Book.findByIdAndUpdate(bookId, { $push: { categories: categoryId } }, { new: true });
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    } catch (err) {
      throw new Error('Error adding category to book');
    }
  }

  async removeCategory(bookId, categoryId) {
    try {
      const book = await Book.findByIdAndUpdate(bookId, { $pull: { categories: categoryId } }, { new: true });
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    } catch (err) {
      throw new Error('Error removing category from book');
    }
  }
}

export default BookRepository;
