import mongoose from 'mongoose';
import Book from '../models/Book.js';
import book from '../routers/customer/book/index.js';
import { ObjectId } from 'mongodb';

class BookRepository {
  constructor() {
  }

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
      const books = await Book.find({ author }); 
      return books;
    } catch (err) {
      console.error(err);
      throw new Error('Error finding books by author'); 
    }
  }
}

export default BookRepository;
