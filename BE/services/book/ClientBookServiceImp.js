import BookRepository from "../../dao/BookRepository.js";
const bookRepository = new BookRepository();

class ClientBookSerivceImp {
    async getAllBooks() {
        try {
          const books = await bookRepository.findAll();
          return books;
        } catch (err) {
          console.error(err);
          throw new Error('Error getting all books'); 
        }
    }
    async findById(id) {
        try {
          const book = await bookRepository.findById(id);
          return book;
        } catch (err) {
          console.error(err);
          throw new Error('Error finding book by ID');
        }
      }
}
export default ClientBookSerivceImp;