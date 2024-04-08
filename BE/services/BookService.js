import Book from "../models/book.js"

class BookService{

    constructor() {
    
    }

    getAllBooks = async ()=>{
        const books = await Book.find()
        if (books)
            return books;
        
    }
}
export default BookService;