import AdminBookServiceImp from "../../services/book/AdminBookServiceImp.js";
const adminBookService = new AdminBookServiceImp();

class AdminBookService {
    async findById(id){
        const book = adminBookService.findById(id);
        return book;
    }
    async getAllBooks(){
        const books = await adminBookService.getAllBooks();
        return books;
    }
    async addBook(book){
        adminBookService.addBook(book);
    }
    async updateBook(id, newBook){
        adminBookService.updateBook(id, newBook);
    }
    async removeBook(id){
        adminBookService.removeBook(id);
    }
  }
  
  export default AdminBookService;
  