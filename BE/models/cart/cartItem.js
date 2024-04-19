import { Schema, model, Types } from 'mongoose';

const CartItemSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, { collection: 'cartitem' });

export default model('CartItem', CartItemSchema);