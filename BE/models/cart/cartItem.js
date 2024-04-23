import { Schema, model} from 'mongoose';

const CartItemSchema = new Schema({
  quantity: { type: Number, required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  book: { type: Schema.Types.ObjectId, ref: 'Book'},
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, { collection: 'cartitem' });

export default model('CartItem', CartItemSchema);