import ClientOrderService from "../../services/order/ClientOrderService.js";
const clientOrderService = new ClientOrderService();

class ClientOrderController{
    constructor(){}

    async getAllOrders(req, res) {
      try {
          const orders = await clientOrderService.getAllOrder(req, req.session);
          const response = orders.map(order => this.responseOrder(order));
          return res.status(200).json({
              status: 200,
              message: "Get all order successfully",
              data: response,
          });
      } catch (err) {
          console.error("Error fetching orders: ", err);
          return res.status(500).send("Error fetching orders");
      }
  }

  async getOrderById(req, res) {
      try {
          const orderId = req.params.orderId;
          const order = await clientOrderService.findOrderById(orderId, req, req.session);
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
          console.error("Error fetching order by ID: ", err);
          return res.status(500).send("Error fetching order by ID");
      }
  }

  async getOrderByStatus(req, res) {
      try {
          const status = req.query.s;
          const orders = await clientOrderService.findOrderByStatus(status, req, req.session);
          const response = orders.map(order => this.responseOrder(order));
          return res.status(200).json({
              status: 200,
              message: "Get order by status successfully",
              data: response,
          });
      } catch (err) {
          console.error("Error fetching orders by status: ", err);
          return res.status(500).send("Error fetching orders by status");
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
          console.error("Error cancelling order: ", err);
          return res.status(500).send("Error cancelling order");
      }
  }

    responseOrder(order) {
      return {
          id: order._id,
          date: order.date,
          payment: order.payment,
          booklist: order.bookList,
          status: order.status,
      };
  }
}

export default ClientOrderController;