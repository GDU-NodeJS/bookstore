import OrderRepository from "../../dao/OrderRepository.js";
const orderRepository = new OrderRepository();

class AdminOrderServiceImp {

    async getAllOrders() {
        try {
            const orders = await orderRepository.admin_getAllOrders();
            return orders;
        } catch (error) {
            console.error(err);
            throw new Error("Not Found by id category");
        }
    }
    async getOrderById(id){
        try {
            const order = await orderRepository.admin_getOrderById(id);
            return order;
        } catch (error) {
            console.error(err);
            throw new Error("Not Found by id category");
        }
    }

    async getOrderByStatus(status){
        try {
            const order = await orderRepository.admin_getOrdersByStatus(status);
            return order;
        } catch (error) {
            console.error(err);
            throw new Error("Not Found by id category");
        }
    }

    async getOrderByUser(userId) {
        try {
            const order = await orderRepository.admin_getOrderByUser(userId);
            return order;
        } catch (error) {
            console.error(err);
            throw new Error("Not Found by id category");
        }
    }

    async updateOrder(oderId, status) {
        try {
            await orderRepository.admin_updateOrder(oderId, status);
        } catch (error) {
            console.error(err);
            throw new Error("Not Found by id category");
        }
    }
}

export default AdminOrderServiceImp;