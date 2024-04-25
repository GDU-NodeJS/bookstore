import { Router } from "express";
import book from "./book/index.js";
import category from "./category/index.js";
import cart from "./cart/index.js"
import order from "./order/index.js";
import pay from "./payment/index.js";

const routerCustomer = Router();

routerCustomer.use("/book",book);
routerCustomer.use("/category",category);
routerCustomer.use("/order",order);
routerCustomer.use("/cart", cart)

routerCustomer.use("/pay", pay);

export default routerCustomer;