import mongoose from 'mongoose';
import CartRepository from '../dao/cart/cartRepository.js';
import CartItemRepository from '../dao/cart/cartItemRepository.js';
import UserRepository from "../dao/UsesrRepository.js";
const SESSION_KEY_CART = 'CART';

class CartService {
  getCartFromSession(session) {
    let cartMap = session[SESSION_KEY_CART];
    if (!cartMap) {
      cartMap = {};
      session[SESSION_KEY_CART] = cartMap;
    }
    return cartMap;
  }

  isUserLoggedIn(req) {
    const authHeader = req.headers.authorization;
    return !!authHeader;
  }

  async getUserId(session) {
    const user = await UserRepository.findOne({ _id: session.user });
    return user?._id;
  }

  async getCartFromDatabase(userId) {
    const cart = await CartRepository.findByUserId(userId);
    const cartMap = {};
    if (cart) {
      const cartItems = await CartItemRepository.findCartItemByCart(cart._id);
      cartItems.forEach(item => {
        cartMap[item.book._id] = item;
      });
    }
    return cartMap;
  }

  async storeCartInDatabase(userId, cartMap) {
    const cart = await CartRepository.findByUserId(userId);

    const existingCartItemIds = cart.cartItems.map(item => item._id);
    const newCartItems = [];
    const updatedCartItems = [];

    for (const [bookId, cartItem] of Object.entries(cartMap)) {
      const existingItem = cart.cartItems.find(item => item.book.toString() === bookId);
      if (existingItem) {
        existingItem.quantity = cartItem.quantity;
        updatedCartItems.push(existingItem);
      } else {
        const book = await mongoose.model('Book').findById(bookId);
        const newItem = new CartItemRepository.CartItemModel({ book, quantity: cartItem.quantity, cart: cart._id });
        newCartItems.push(newItem);
      }
    }

    const itemIdsToRemove = cart.cartItems
      .filter(item => !updatedCartItems.includes(item))
      .map(item => item._id);

    await CartItemRepository.deleteMany(itemIdsToRemove);
    await Promise.all(updatedCartItems.map(item => CartItemRepository.updateCartItem(item._id, item.quantity)));
    await Promise.all(newCartItems.map(item => CartItemRepository.createCartItem(item)));

    cart.cartItems = [...updatedCartItems, ...newCartItems].map(item => item._id);
    await CartRepository.update(cart);
  }

  async addToCart(req, bookId, quantity) {
    const session = req.session;
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(session);
      let cartMap = await this.getCartFromDatabase(userId);
      let cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cartItem = { book: bookId, quantity };
        cartMap[bookId] = cartItem;
      }
      await this.storeCartInDatabase(userId, cartMap);
    } else {
      const cartMap = this.getCartFromSession(session);
      let cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cartItem = { book: bookId, quantity };
        cartMap[bookId] = cartItem;
      }
      session[SESSION_KEY_CART] = cartMap;
    }
  }

  async removeFromCart(req, bookId) {
    const session = req.session;
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(session);
      const cartMap = await this.getCartFromDatabase(userId);
      const itemToRemove = cartMap[bookId];
      if (itemToRemove) {
        await CartItemRepository.deleteCartItem(itemToRemove._id);
        delete cartMap[bookId];
        await this.storeCartInDatabase(userId, cartMap);
      }
    } else {
      const cartMap = this.getCartFromSession(session);
      delete cartMap[bookId];
      session[SESSION_KEY_CART] = cartMap;
    }
  }

  async updateCart(req, bookId, quantity) {
    const session = req.session;
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(session);
      const cartMap = await this.getCartFromDatabase(userId);
      const cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity = quantity;
        await this.storeCartInDatabase(userId, cartMap);
      }
    } else {
      const cartMap = this.getCartFromSession(session);
      const cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      session[SESSION_KEY_CART] = cartMap;
    }
  }

  async clearCart(req) {
    const session = req.session;
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(session);
      const cart = await CartRepository.findByUserId(userId);
      if (cart) {
        await CartItemRepository.deleteMany(cart.cartItems);
        cart.cartItems = [];
        await CartRepository.update(cart);
      }
    } else {
      const cartMap = this.getCartFromSession(session);
      cartMap = {};
      session[SESSION_KEY_CART] = cartMap;
    }
  }

  async getCart(req) {
    const session = req.session;
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(session);
      const cartMap = await this.getCartFromDatabase(userId);
      return Object.values(cartMap);
    } else {
      const cartMap = this.getCartFromSession(session);
      return Object.values(cartMap);
    }
  }
}

export default CartService;