import ClientOrderServiceImp from "../../services/order/ClientOrderServiceImp.js";
const ClientOrderServiceImp = new ClientOrderServiceImp();

class ClientOrderService {
    async createOrder(userId, cartItem, session){
        const order = await ClientOrderServiceImp.createOrder(userId, cartItem, session);
        return order;
    }
    async getAllOrders(request, session){
        const orders = await ClientOrderServiceImp.getAllOrders(request, session);
        return orders;
    }
    async getOrderById(orderId, request, session){
        const order = await ClientOrderServiceImp.getOrderById(orderId, session);
        return order;
    }
    async getOrderByStatus(status, request, session){
        const orders = await ClientOrderServiceImp.getOrderByStatus(status, session);
        return orders;
    }
    async cancelOrder(orderId, request, session){
        await ClientOrderServiceImp.cancelOrder(orderId, request, session);
    }
}

export default ClientOrderService;