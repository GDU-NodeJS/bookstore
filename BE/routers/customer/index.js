import { Router } from "express";
import book from "./book/index.js";
import category from "./category/index.js";
import order from "./order/index.js";
const routerClient = Router();

routerClient.use("/book",book);
routerClient.use("/category",category);
routerClient.use("/order",order);


export default routerClient;