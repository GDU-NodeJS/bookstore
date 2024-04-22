import { Router } from "express";
import book from "./book/index.js";
import cart from "./cart/index.js"
import categoryRouter from "./category/index.js";

const routerCustomer = Router();

routerCustomer.use("/book",book);
routerCustomer.use("/category", categoryRouter);
routerCustomer.use("/cart", cart)

export default routerCustomer;