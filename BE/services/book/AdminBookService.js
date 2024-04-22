import AdminBookServiceImp from "../../services/book/AdminBookServiceImp.js";
const adminBookService = new AdminBookServiceImp();

class AdminBookService {
    async findById(id){
        const book = await adminBookService.findById(id);
        return book;
    }
    async getAllBooks(){
        const books = await adminBookService.getAllBooks();
        return books;
    }
    async addBook(book){
        await adminBookService.addBook(book);
    }
    async updateBook(id, newBook){
        await adminBookService.updateBook(id, newBook);
    }
    async removeBook(id){
        await adminBookService.removeBook(id);
    }
  }
  
  export default AdminBookService;
  