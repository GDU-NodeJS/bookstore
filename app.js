import { MongoClient } from 'mongodb'; 
import { mongoDBURL as _mongoDBURL } from './config/config.json' assert { type: 'json' };
async function connectToMongo() {
  const mongoDBURL = _mongoDBURL;

  try {
    const client = await MongoClient.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('bookstore'); 

    console.log('Connected to MongoDB!');

    const bookData = {
      price: 29.99,
      image: 'null',
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel about the Jazz Age in America.',
    };

    const result = await db.collection('book').insertOne(bookData);
    console.log(`Inserted book with ID: ${result.insertedId}`);

    client.close();
  } catch (err) {
    console.error('Failed to connect or insert data:', err);
  }
}

connectToMongo();
