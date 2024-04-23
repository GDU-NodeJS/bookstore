import AdminOrderService from "../../services/order/AdminOrderService.js"
const adminOrderService = new AdminOrderService();

class AdminOrderController {
    constructor() {}
    async getAllOrders(req, res){
        try {
            const orders = await adminOrderService.getAllOrders(req);
            const response = orders.map(order => this.responseOrder(order));
            return res.status(200).json({
                status: 200,
                message: "Get all order successfully",
                data: response,
            });
        } catch (err) {
            console.log(err);
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
    async getOrderById(req, res){
        try {
            const orderId = req.params.orderId;
            const order = await adminOrderService.getOrderById(orderId, req);
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
    async getOrderByStatus(req, res){
        try {
            const status = req.params.status;
            const orders = await adminOrderService.getOrderByStatus(status, req);
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
    async getOrderByUser(req, res){
        try {
            const userId = req.params.userId;
            const orders = await adminOrderService.getOrderByUser(userId, req);
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
    async updateOrders(req, res){
      try {
        const orderId = req.params.orderId;
        const status = req.query.status;
        await adminOrderService.updateOrder(orderId, status, req);
        return res.status(200).json({
            status: 200,
            message: "Update status successfully"
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
            user_id: userId,
            status: order.status
        };
    }
}

export default AdminOrderController;