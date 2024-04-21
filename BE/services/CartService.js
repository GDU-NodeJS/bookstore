import mongoose from 'mongoose';

const SESSION_KEY_CART = 'CART';

class CartService {
  constructor(cartModel, cartItemModel, userModel) {
    this.CartModel = cartModel;
    this.CartItemModel = cartItemModel;
    this.UserModel = userModel;
  }

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
    const user = await this.UserModel.findOne({ _id: session.user });
    return user?._id;
  }

  async getCartFromDatabase(userId) {
    const cart = await this.CartModel.findOne({ user: userId }).populate('cartItems.book');
    const cartMap = cart?.cartItems.reduce((map, item) => {
      map[item.book._id] = item;
      return map;
    }, {}) || {};
    return cartMap;
  }

  async storeCartInDatabase(userId, cartMap) {
    const cart = await this.CartModel.findOne({ user: userId });

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
        const newItem = new this.CartItemModel({ book, quantity: cartItem.quantity, cart: cart._id });
        newCartItems.push(newItem);
      }
    }

    const itemIdsToRemove = cart.cartItems
      .filter(item => !updatedCartItems.includes(item))
      .map(item => item._id);

    await this.CartItemModel.deleteMany({ _id: { $in: itemIdsToRemove } });
    await Promise.all(updatedCartItems.map(item => item.save()));
    await Promise.all(newCartItems.map(item => item.save()));
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
        await this.CartItemModel.findByIdAndDelete(itemToRemove._id);
        delete cartMap[bookId];
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
      const cart = await this.CartModel.findOne({ user: userId });
      if (cart) {
        const cartItem = cart.cartItems.find(item => item.book.toString() === bookId);
        if (cartItem) {
          cartItem.quantity = quantity;
          await cartItem.save();
        }
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
      const cart = await this.CartModel.findOne({ user: userId });
      if (cart) {
        await this.CartItemModel.deleteMany({ _id: { $in: cart.cartItems } });
        cart.cartItems = [];
        await cart.save();
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