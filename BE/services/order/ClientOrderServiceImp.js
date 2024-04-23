import OrderRepository from "../../dao/OrderRepository.js";
import BookRepository from "../../dao/BookRepository.js";
const orderRepository = new OrderRepository();
const bookRepository = new BookRepository();

class ClientOrderServiceImp {

  isUserLoggedIn(req) {
    const authHeader = req.headers.authorization;
    return !!authHeader;
  }

  async getUserFromSession(req) {
    const user = req.session.user;
    return user;
  }

  async createOrder(userId, cartItem, req) {
    const isLoggedIn = this.isUserLoggedIn(req);
    if (!isLoggedIn) {
      throw new Error("User is not logged in");
    }

    const bookBuffer = cartItem.book.buffer;
    const bookId = bookBuffer.toString('hex');

    const book = await bookRepository.findById(bookId);

    const bookList = [cartItem.book];
    const payment = book.price * cartItem.quantity;
    const newOrderData = {
      date: new Date(),
      user: userId,
      bookList,
      payment,
      status: 'PENDING'
    };

    await orderRepository.user_createOrder(newOrderData);
  }
  
  async getAllOrders(req) {
    const isLoggedIn = this.isUserLoggedIn(req);
    const user = await this.getUserFromSession(req);
    if (!isLoggedIn) {
      throw new Error("User is not logged in");
    }

    const userId = user.id;
    return await orderRepository.user_getAllOrders(userId);
  }

  async getOrderById(id, request, session) {
    const user = this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    return await orderRepository.user_getOrderById(userId, id);
  }

  async cancelOrder(id, request, session) {
    const user = this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    const order = await orderRepository.user_getOrderById(userId, id);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === 'CANCELLED') {
      throw new Error("Order is already cancelled");
    }

    if (order.status !== 'PENDING') {
      throw new Error("Order is not pending");
    }

    await orderRepository.user_cancelOrder(userId, id, { status: 'CANCELLED' });
  }

  async getOrderByStatus(status, request, session) {
    const user = await this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    return await orderRepository.user_getOrdersByStatus(userId, status);
  }
}

export default ClientOrderServiceImp;