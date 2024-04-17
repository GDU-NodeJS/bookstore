import BookRepository from "../../dao/BookRepository.js";
const bookRepository = new BookRepository();

class AdminBookServiceImp {
  
    async findById(id) {
      try {
        const book = await BookRepository.findById(id);
        return book;
      } catch (err) {
        console.error(err);
        throw new Error('Error finding book by ID'); // Re-throw for handling
      }
    }
  
    async updateBook(id, newBook) {
      try {
        const updatedBook = await this.bookRepository.findByIdAndUpdate(id, newBook, { new: true }); // Update and return updated doc
        return updatedBook;
      } catch (err) {
        console.error(err);
        throw new Error('Error updating book'); // Re-throw for handling
      }
    }
  
    async addBook(book) {
      try {
        const newBook = await this.bookRepository.create(book); // Assuming create method in BookSchema
        return newBook;
      } catch (err) {
        console.error(err);
        throw new Error('Error adding book'); // Re-throw for handling
      }
    }
  
    async removeBook(id) {
      try {
        await this.bookRepository.findByIdAndDelete(id);
      } catch (err) {
        console.error(err);
        throw new Error('Error removing book'); // Re-throw for handling
      }
    }
  
    async searchBooks(keyword) {
      try {
        const books = await this.bookRepository.find({ name: { $regex: keyword, $options: 'i' } }); // Case-insensitive search by name
        return books;
      } catch (err) {
        console.error(err);
        throw new Error('Error searching books'); // Re-throw for handling
      }
    }
  
    async getAllBooks() {
      try {
        const books = await bookRepository.findAll(); // Find all documents
        return books;
      } catch (err) {
        console.error(err);
        throw new Error('Error getting all books'); // Re-throw for handling
      }
    }
  }
  
  export default AdminBookServiceImp;
  