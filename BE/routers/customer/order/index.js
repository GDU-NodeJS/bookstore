import { Router } from "express";
import ClientOrderController from "../../../controllers/order/ClientOrderController.js";

const order = Router();
const orderController = new ClientOrderController();

order.get('/getAll', orderController.getAllOrders.bind(orderController));
order.get('/:id', orderController.getOrderById.bind(orderController));
order.get('/status', orderController.getOrderByStatus.bind(orderController));

// Để cancel order, chúng ta sử dụng phương thức POST vì nó không phải là một hoạt động CRUD truyền thống.
order.post('/:id/cancel', orderController.cancelOrder.bind(orderController));

export default order;