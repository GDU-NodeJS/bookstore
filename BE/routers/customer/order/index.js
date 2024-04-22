import { Router } from "express";
import ClientOrderController from "../../../controllers/order/ClientOrderController.js";

const order = Router();
const orderController = new ClientOrderController();

order.get('/getAll',orderController.getAllOrder);
order.get('/:id',orderController.getOrderById);
order.get('/user/:userid',orderController.getOrdersByUserId);


export default order;