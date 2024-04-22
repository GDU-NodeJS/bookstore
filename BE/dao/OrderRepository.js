import Order from "../models/order.js";

class OrderRepository {
  constructor() {}
  async createOrder(orderData) {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (err) {
      throw new Error(`Failed to create order: ${err.message}`);
    }
  }

  async getAllOrders(userId) {
    try {
      return await Order.find({ user: userId });
    } catch (err) {
      throw new Error(`Failed to get all orders for user ${userId}: ${err.message}`);
    }
  }

  async getOrderById(orderId, userId) {
    try {
      return await Order.findOne({ _id: orderId, user: userId });
    } catch (err) {
      throw new Error(`Failed to get order ${orderId} for user ${userId}: ${err.message}`);
    }
  }

  async getOrdersByStatus(userId, status) {
    try {
      return await Order.find({ user: userId, status });
    } catch (err) {
      throw new Error(`Failed to get orders with status ${status} for user ${userId}: ${err.message}`);
    }
  }

  async updateOrder(orderId, userId, updateData) {
    try {
      return await Order.findOneAndUpdate({ _id: orderId, user: userId }, updateData, { new: true });
    } catch (err) {
      throw new Error(`Failed to update order ${orderId} for user ${userId}: ${err.message}`);
    }
  }

  async cancelOrder(orderId, userId) {
    try {
      return await Order.findOneAndUpdate({ _id: orderId, user: userId }, { status: 'CANCELLED' }, { new: true });
    } catch (err) {
      throw new Error(`Failed to cancel order ${orderId} for user ${userId}: ${err.message}`);
    }
  }

  async adminFindOrderById(orderId) {
    try {
      return await Order.findOne({ _id: orderId });
    } catch (err) {
      throw new Error(`Failed to find order ${orderId}: ${err.message}`);
    }
  }

  async adminFindOrdersByStatus(status) {
    try {
      return await Order.find({ status });
    } catch (err) {
      throw new Error(`Failed to find orders with status ${status}: ${err.message}`);
    }
  }

  async findOrdersByUserId(userId) {
    try {
      return await Order.find({ user: userId });
    } catch (err) {
      throw new Error(`Failed to find orders for user ${userId}: ${err.message}`);
    }
  }

  async userFindOrderById(userId, orderId) {
    try {
      return await Order.findOne({ _id: orderId, user: userId });
    } catch (err) {
      throw new Error(`Failed to find order ${orderId} for user ${userId}: ${err.message}`);
    }
  }

  async findOrdersByUserIdAndStatus(userId, status) {
    try {
      return await Order.find({ user: userId, status });
    } catch (err) {
      throw new Error(`Failed to find orders with status ${status} for user ${userId}: ${err.message}`);
    }
  }
}


export default OrderRepository;