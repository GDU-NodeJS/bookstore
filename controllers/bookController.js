import Book from '../models/book.js'; 

// Function to retrieve books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books); 
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Error retrieving books');
  }
};

export default {
  getBooks
};
