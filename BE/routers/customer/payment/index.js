import {Router } from "express";
import Payment from "../../../services/Payment/Payment.js";

const pay = Router();
const paymentController = new Payment();

pay.post('/', paymentController.payProduct.bind(paymentController));

export default pay;