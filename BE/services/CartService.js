import mongoose from 'mongoose';
import CartRepository from '../dao/cart/cartRepository.js';
import CartItemRepository from '../dao/cart/cartItemRepository.js';
import AdminBookServiceImp from './book/AdminBookServiceImp.js';
import UserRepository from "../dao/UserRepository.js";
import CartItem from "../models/cart/cartItem.js";
import User from "../models/auth/user.js";
const SESSION_KEY_CART = 'CART';
const cartRepository = new CartRepository();
const cartItemRepository = new CartItemRepository();
const adminBookServiceImp = new AdminBookServiceImp();
class CartService {

  getCartFromSession(req) {
    let cartMap = req.session[SESSION_KEY_CART];
    if (!cartMap) {
      cartMap = {};
      req.session[SESSION_KEY_CART] = cartMap;
    }
    return cartMap;
  }

  isUserLoggedIn(req) {
    const authHeader = req.headers.authorization;
    return !!authHeader;
  }

   getUserId(req) {
    return req.session.user.id;
  }

  async getCartFromDatabase(userId) {
    const cart = await cartRepository.findByUserId(userId);
    const cartMap = {};

    if (cart && cart.cartItems) {
      cart.cartItems.forEach(item => {
        cartMap[item.book._id] = item;
      });
    }

    return cartMap;
  }

  async storeCartInDatabase(userId, cartMap) {
    const cart = await cartRepository.findByUserId(userId);

    const newCartItems = [];
    const updatedCartItems = [];

    for (const [bookId, cartItem] of Object.entries(cartMap)) {
      const existingItem = cart?.cartItems.find(item => item.book.toString() === bookId);
      if (existingItem) {
        existingItem.quantity = cartItem.quantity;
        updatedCartItems.push(existingItem);
      } else {
        const book = await adminBookServiceImp.findById(bookId);
        const newItem = new CartItem({ book, quantity: cartItem.quantity, cart: cart._id });
        newCartItems.push(newItem);
      }
    }

    const itemIdsToRemove = cart.cartItems
      .filter(item => !updatedCartItems.includes(item))
      .map(item => item._id);

    await cartItemRepository.deleteCart(itemIdsToRemove);
    await Promise.all(updatedCartItems.map(item => cartItemRepository.updateCartItem(item._id, item.quantity)));
    await Promise.all(newCartItems.map(item => cartItemRepository.createCartItem(item)));

    cart.cartItems = [...updatedCartItems, ...newCartItems].map(item => item._id);
    await cartRepository.update(cart._id,cart);
  }

  async addToCart(req, bookId, quantity) {
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(req);
      let cartMap = await this.getCartFromDatabase(userId);
      let cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity =(parseInt(cartItem.quantity) + parseInt(quantity)).toString();
      } else {
        cartItem = { book: bookId, quantity };
        cartMap[bookId] = cartItem;
      }
      await this.storeCartInDatabase(userId, cartMap);
    } else {
      const cartMap = this.getCartFromSession(req);
      let cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity =(parseInt(cartItem.quantity) + parseInt(quantity)).toString();
      } else {
        cartItem = { book: bookId, quantity };
        cartMap[bookId] = cartItem;
      }
      req.session[SESSION_KEY_CART] = cartMap;
    }
  }

  async removeFromCart(req, bookId) {
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(req);
      const cartMap = await this.getCartFromDatabase(userId);
      const itemToRemove = cartMap[bookId];
      if (itemToRemove) {
        await cartItemRepository.deleteCartItem(itemToRemove._id);
        delete cartMap[bookId];
        await this.storeCartInDatabase(userId, cartMap);
      }
    } else {
      const cartMap = this.getCartFromSession(req);
      delete cartMap[bookId];
      req.session[SESSION_KEY_CART] = cartMap;
    }
  }

  async updateCart(req, bookId, quantity) {
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(req);
      const cartMap = await this.getCartFromDatabase(userId);
      const cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity = quantity;
        await this.storeCartInDatabase(userId, cartMap);
      }
    } else {
      const cartMap = this.getCartFromSession(req);
      const cartItem = cartMap[bookId];
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      req.session[SESSION_KEY_CART] = cartMap;
    }
  }

  async clearCart(req) {
    const session = req.session;
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const userId = await this.getUserId(req);
      const cart = await cartRepository.findByUserId(userId);
      if (cart) {
        await cartItemRepository.deleteCart(cart._id);
        cart.cartItems = [];
        await cartRepository.update(cart);
      }
    } else {
      const cartMap = this.getCartFromSession(req);
      cartMap = {};
      req.session[SESSION_KEY_CART] = cartMap;
    }
  }

  async getCart(req) {
    const userId = this.getUserId(req);
    const isLoggedIn = this.isUserLoggedIn(req);

    if (isLoggedIn) {
      const cartMap = await this.getCartFromDatabase(userId);
      return Object.values(cartMap);
    } else {
      const cartMap = this.getCartFromSession(req);
      return Object.values(cartMap);
    }
  }
  async createCart(cart){
    return await cartRepository.create(cart);
  }
}

export default CartService;