import ClientOrderServiceImp from "../../services/order/ClientOrderServiceImp.js";
const clientOrderServiceImp = new ClientOrderServiceImp();

class ClientOrderService {
    async createOrder(userId, cartItem, session){
        const order = await clientOrderServiceImp.createOrder(userId, cartItem, session);
        return order;
    }
    async getAllOrders(request, session){
        const orders = await clientOrderServiceImp.getAllOrders(request, session);
        return orders;
    }
    async getOrderById(orderId, request, session){
        const order = await clientOrderServiceImp.getOrderById(orderId, session);
        return order;
    }
    async getOrderByStatus(status, request, session){
        const orders = await clientOrderServiceImp.getOrderByStatus(status, session);
        return orders;
    }
    async cancelOrder(orderId, request, session){
        await clientOrderServiceImp.cancelOrder(orderId, request, session);
    }
}

export default ClientOrderService;