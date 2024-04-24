import OrderRepository from "../../dao/OrderRepository.js";
import BookRepository from "../../dao/BookRepository.js";
import UserRepository from "../../dao/UserRepository.js";
import PaymentService from "../../services/Payment/PaymentService.js";
const orderRepository = new OrderRepository();
const bookRepository = new BookRepository();
const userRepository = new UserRepository();
const paymentService = new PaymentService();


class ClientOrderServiceImp {

  isUserLoggedIn(req) {
    const authHeader = req.headers.authorization;
    return !!authHeader;
  }

  async getUserFromSession(req) {
    const user = req.session.user;
    const isUser = await this.isUser(user.id);
    if (!isUser) {
      throw new Error("Not the user");
    }
    return user;
  }

  async isUser(userId) {
    const role = await userRepository.getUserRole(userId); 
    if (role === 'User') {
      return true;
    }
    return false;
  }

  async checkout(cartItemId, req) {
    const isLoggedIn = this.isUserLoggedIn(req);
    if (!isLoggedIn) {
      throw new Error('User must be logged in to checkout');
    }
  
    const cartItem = await this.getCartItem(cartItemId, req);
    const bookBuffer = cartItem.book.buffer;
    const bookId = bookBuffer.toString('hex');
  
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
  
    try {
      const userId = this.getUserId(req);
  
      // Make payment first
      const paymentOrderId = await paymentService.createPaymentOrder(cartItem.book.price * cartItem.quantity);
  
      // Verify payment status before creating the order
      const paymentStatus = await paymentService.getPaymentStatus(paymentOrderId);
      if (paymentStatus === 'success') {
        // Create order
        const newOrderData = {
          date: new Date(),
          user: userId,
          bookList: [cartItem.book],
          payment: cartItem.book.price * cartItem.quantity,
          paymentOrderId,
          status: 'PENDING'
        };
  
        await orderRepository.user_createOrder(newOrderData);
  
        // Remove from cart
        await this.removeFromCart(req, bookId);
  
        return `https://www.paypal.com/checkoutnow?token=${paymentOrderId}`;
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      throw new Error(error);
    }
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

  async getOrderById(orderId, req) {
    const isLoggedIn = this.isUserLoggedIn(req);
    const user = await this.getUserFromSession(req);

    if (!isLoggedIn) {
      throw new Error("User is not logged in");
    }

    const userId = user.id;
    return await orderRepository.user_getOrderById(userId, orderId);
  }

  async cancelOrder(orderId, req) {
    const isLoggedIn = this.isUserLoggedIn(req);
    const user = await this.getUserFromSession(req);
    if (!isLoggedIn) {
      throw new Error("User is not logged in");
    }

    const userId = user.id;
    const order = await orderRepository.user_getOrderById(userId, orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === 'CANCELLED') {
      throw new Error("Order is already cancelled");
    }

    if (order.status !== 'PENDING') {
      throw new Error("Order is not pending");
    }

    await orderRepository.user_cancelOrder(userId, orderId);
  }

  async getOrderByStatus(status, req) {
    const isLoggedIn = this.isUserLoggedIn(req);
    const user = await this.getUserFromSession(req);
    if (!isLoggedIn) {
      throw new Error("User is not logged in");
    }

    const userId = user.id;
    return await orderRepository.user_getOrdersByStatus(userId, status);
  }
}

export default ClientOrderServiceImp;