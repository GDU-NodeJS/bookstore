import ClientOrderService from "../../services/order/ClientOrderService.js";
const clientOrderService = new ClientOrderService();

class ClientOrderController{
    constructor(){}

    async getOrderById(req, res) {
      try{
        const OrderId = req.params.id;
        const order = await clientOrderService.getOrderById(OrderId);
        if (!order){
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message : "Successfully retrieved the Order",
            data : order,
        });
    } catch(err){
        console.error("Error fetching the order: ",err);
        return res.status(500).send("Error fetching the order");
    }
        
      }
    
      async getOrdersByUserId(req, res) {
        try {
          const userId = req.params.userId;
          const orders = await clientOrderService.getOrdersByUserId(userId);
          return res.status(200).json({
            status: 200,
            message: "Successfully retrieved orders",
            data: orders,
          });
        } catch (err) {
          console.error("Error fetching orders: ", err);
          return res.status(500).send("Error fetching orders");
        }
      }
    async getAllOrder(req, res) {
        try{
            const orders = await clientOrderService.getAllOrder();
            return res.status(200).json({
                status: 200,
                message : "Successfully retrieved data",
                data : orders,
            });
        } catch(err){
            console.error("Error fetching order: ",err);
            return res.status(500).send("Error fetching order");
        }
    }


}

export default ClientOrderController;