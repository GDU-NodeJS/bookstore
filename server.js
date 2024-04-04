import { connect } from 'mongoose';
import configData from './config/config.json' assert { type: 'json' };
import express from "express";

import bookController from './controllers/bookController.js';

const app = express();

const mongoDBURL = configData.mongoDBURL; 
(async () => {
  try {
    await connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
})();

app.use((req, res, next) => {
  req.currentDate = new Date();
  next();
});

app.get('/api/books', bookController.getBooks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));