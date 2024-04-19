import { Schema, model, Types } from 'mongoose';

const CartSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }]
}, { collection: 'cart' });

export default model('Cart', CartSchema);