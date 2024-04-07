"use strict"
import mongoose from 'mongoose';
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import bookController from './controllers/bookController.js';

const app = express();

const mongoDBURL = process.env.mongoDBURL

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use((req, res, next) => {
  req.currentDate = new Date();
  next();
});

app.get('/api/books', bookController.getBooks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));