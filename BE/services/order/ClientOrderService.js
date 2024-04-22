import OrderRepository from "../../dao/OrderRepository.js";
const orderRepository = new OrderRepository();

class ClientOrderService {

  async isUserLoggedIn(request, session) {
    const user = await this.getUserFromSession(session);
    return !!user;
  }


  async getUserFromSession(session) {
    // Implement the logic to get the user from the session
    const user = session.USER;
    return user;
  }

  async addOrder(userId, cartItem, session) {
    const user = await this.getUserFromSession(session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const bookList = [cartItem.book];
    const cartItemList = [cartItem];
    const payment = cartItem.book.price * cartItem.quantity;
    const newOrderData = {
      date: new Date(),
      user: userId,
      bookList,
      cartItemList,
      payment,
      status: 'PENDING'
    };

    await orderRepository.createOrder(newOrderData);
  }
  async getAllOrder(request, session) {
    const user = await this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    return await orderRepository.findOrdersByUserId(userId);
  }

  async findOrderById(id, request, session) {
    const user = await this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    return await orderRepository.userFindOrderById(userId, id);
  }

  async cancelOrder(id, request, session) {
    const user = await this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    const order = await orderRepository.userFindOrderById(userId, id);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === 'CANCELLED') {
      throw new Error("Order is already cancelled");
    }

    if (order.status !== 'PENDING') {
      throw new Error("Order is not pending");
    }

    await orderRepository.updateByUserIdAndId(userId, id, { status: 'CANCELLED' });
  }

  async findOrderByStatus(status, request, session) {
    const user = await this.isUserLoggedIn(request, session);
    if (!user) {
      throw new Error("User is not logged in");
    }

    const userId = user.userID;
    return await orderRepository.findOrdersByUserIdAndStatus(userId, status);
  }
}

export default ClientOrderService;