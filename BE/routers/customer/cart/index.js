import {Router } from "express";
import CartController from "../../../controllers/cartController.js";
const cart = Router();
const cartController = new CartController();
cart.get('/getCart', cartController.getCart.bind(cartController));
cart.post('/add/:bookId/:quantity', cartController.addToCart.bind(cartController));
cart.post('/delete/:bookId', cartController.removeFromCart.bind(cartController))
cart.post('/update/:bookId/:quantity',cartController.updateCart.bind(cartController))
cart.get('/clearAll', cartController.clearCart.bind(cartController))
export default cart;