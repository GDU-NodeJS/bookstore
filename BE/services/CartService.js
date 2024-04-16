import mongoose from 'mongoose';
import CartModel from './models/Cart.js';
import CartItemModel from './models/CartItem.js';

const SESSION_KEY_CART = 'CART';

const getCartFromSession = (session) => {
  let cartMap = session[SESSION_KEY_CART];
  if (!cartMap) {
    cartMap = {};
    session[SESSION_KEY_CART] = cartMap;
  }
  return cartMap;
};

const isUserLoggedIn = (req) => {
  const authHeader = req.headers.authorization;
  return !!authHeader;
};

const getUserId = (session) => {
  const user = session.user;
  return user ? user._id : null;
};

const getCartFromDatabase = async (userId) => {
  const cart = await CartModel.findOne({ user: userId }).populate('cartItems.book');
  const cartMap = cart?.cartItems.reduce((map, item) => {
    map[item.book._id] = item;
    return map;
  }, {}) || {};
  return cartMap;
};

const storeCartInDatabase = async (userId, cartMap) => {
  const cart = await CartModel.findOne({ user: userId });

  const existingCartItems = cart.cartItems.map(item => item._id);
  const newCartItems = [];
  const updatedCartItems = [];

  for (const [bookId, cartItem] of Object.entries(cartMap)) {
    const existingItem = cart.cartItems.find(item => item.book.toString() === bookId);
    if (existingItem) {
      existingItem.quantity = cartItem.quantity;
      updatedCartItems.push(existingItem);
    } else {
      const book = await mongoose.model('Book').findById(bookId);
      const newItem = new CartItemModel({ book, quantity: cartItem.quantity, cart: cart._id });
      newCartItems.push(newItem);
    }
  }

  const itemIdsToRemove = cart.cartItems
    .filter(item => !updatedCartItems.includes(item))
    .map(item => item._id);

  await CartItemModel.deleteMany({ _id: { $in: itemIdsToRemove } });
  await Promise.all(updatedCartItems.map(item => item.save()));
  await Promise.all(newCartItems.map(item => item.save()));
};

export const addToCart = async (req, bookId, quantity) => {
  const session = req.session;
  const isLoggedIn = isUserLoggedIn(req);

  if (isLoggedIn) {
    const userId = getUserId(session);
    let cartMap = await getCartFromDatabase(userId);
    let cartItem = cartMap[bookId];
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = { book: bookId, quantity };
      cartMap[bookId] = cartItem;
    }
    await storeCartInDatabase(userId, cartMap);
  } else {
    const cartMap = getCartFromSession(session);
    let cartItem = cartMap[bookId];
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = { book: bookId, quantity };
      cartMap[bookId] = cartItem;
    }
    session[SESSION_KEY_CART] = cartMap;
  }
};

// Implement other methods like removeFromCart, updateCart, clearAll, getAll similarly