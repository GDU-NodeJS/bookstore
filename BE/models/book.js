import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  price: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
}, { collection: 'book' }); 

export default model('Book', BookSchema);
