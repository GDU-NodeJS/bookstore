import mongoose from 'mongoose';
import Cart from "../../models/cart/cart.js"
class CartRepository {
  constructor() {
  }

  async findByUserId(userId) {
    return await Cart.findOne({ user: userId }).populate('cartItems');
  }

  async create(cart) {
    return await cart.save();
  }

  async update(cart) {
    return await cart.save();
  }

  async deleteByUserId(userId) {
    return await Cart.findOneAndDelete({ user: userId });
  }
}

export default CartRepository;