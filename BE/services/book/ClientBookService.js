import ClientBookSerivce from "../../services/book/ClientBookServiceImp.js";
const clientBookService = new ClientBookSerivce();

class ClientBookSerivce {
    async getAllBooks() {
        const books = await clientBookService.getAllBooks();
        return books;
    }
    async getBookById(id) {
        const book = adminBookService.findById(id);
        return book;
    }
}