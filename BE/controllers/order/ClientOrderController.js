import ClientOrderService from "../../services/order/ClientOrderService.js";
const clientOrderService = new ClientOrderService();

class ClientOrderController{
    constructor(){}

    async getAllOrders(req, res) {
      try {
          const orders = await clientOrderService.getAllOrders(req);
          const response = orders.map(order => this.responseOrder(order));
          return res.status(200).json({
              status: 200,
              message: "Get all order successfully",
              data: response,
          });
      } catch (err) {
        let errorMessage = err.message;
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.slice(7);
        }
          return res.status(400).json({
            status: 400,
            message: errorMessage
          });
      }
  }

  async getOrderById(req, res) {
      try {
          const orderId = req.params.orderId;
          const order = await clientOrderService.getOrderById(orderId, req);
          if (order) {
              return res.status(200).json({
                  status: 200,
                  message: "Get order successfully",
                  data: this.responseOrder(order),
              });
          } else {
              return res.status(404).json({
                  status: 404,
                  message: "Order not found",
              });
          }
      } catch (err) {
        let errorMessage = err.message;
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.slice(7);
        }
          return res.status(400).json({
            status: 400,
            message: errorMessage
          });
      }
  }

  async getOrderByStatus(req, res) {
      try {
          const status = req.query.s;
          const orders = await clientOrderService.getOrderByStatus(status, req);
          const response = orders.map(order => this.responseOrder(order));
          return res.status(200).json({
              status: 200,
              message: "Get order by status successfully",
              data: response,
          });
      } catch (err) {
        let errorMessage = err.message;
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.slice(7);
        }
          return res.status(400).json({
            status: 400,
            message: errorMessage
          });
      }
  }

  async cancelOrder(req, res) {
      try {
          const orderId = req.params.orderId;
          await clientOrderService.cancelOrder(orderId, req, req.session);
          return res.status(200).json({
              status: 200,
              message: "Cancel order successfully",
          });
      } catch (err) {
        let errorMessage = err.message;
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.slice(7);
        }
          return res.status(400).json({
            status: 400,
            message: errorMessage
          });
      }
  }

    responseOrder(order) {
        const user = order.user.buffer;
        const userId = user.toString('hex');
      return {
          id: order._id,
          date: order.date,
          payment: order.payment,
          booklist: order.bookList,
          status: order.status,
          user_id: userId
      };
  }
}

export default ClientOrderController;