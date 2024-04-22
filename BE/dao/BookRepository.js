import Book from '../models/Book.js';
import Category from '../models/Category.js';

class BookRepository {
  constructor() {}

  async create(bookData) {
    try {
      const newBook = new Book(bookData);
  
      for (const categoryId of bookData.categories) {
        const category = await Category.findByIdAndUpdate(categoryId, { $push: { books: newBook._id } }, { new: true }); // Update category with book's Id
        if (!category) {
          throw new Error(`Category with id ${categoryId} not found`);
        }
      }
  
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
      select: 'name'
    });
    return books;
  }

  async findByName(name) {
    try {
      const book = await Book.findOne({ name }).populate({
        path: 'categories',
        select: 'name',
        options: { lean: true }
      });
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding book by name');
    }
  }

  async findById(id) {
    try {
      const book = await Book.findById(id).populate({
        path: 'categories',
        select: 'name',
        options: { lean: true }
      });
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
      const books = await Book.find({ author }).populate({
        path: 'categories',
        select: 'name',
        options: { lean: true }
      });
      return books;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding books by author');
    }
  }

  async removeBook(id) {
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return null;
      }
      for (const categoryId of book.categories) {
        await Category.findByIdAndUpdate(categoryId, { $pull: { books: book._id } });
      }
  
      return book;
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting book');
    }
  }
  

  async addCategory(bookId, categoryId) {
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      book.categories.push(categoryId);
      await book.save();
      return book;
    } catch (err) {
      throw new Error('Error adding category to book');
    }
  }

  async removeCategory(bookId, categoryId) {
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      book.categories.pull(categoryId);
      await book.save();
      return book;
    } catch (err) {
      throw new Error('Error removing category from book');
    }
  }
}

export default BookRepository;
