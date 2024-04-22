import { Router } from "express";
import book from "./book/index.js";
import auth from "./Authen/index.js";
import cart from "./cart/index.js"
const routerCustomer = Router();

routerCustomer.use("/book",book);
routerCustomer.use("/auth", auth);
routerCustomer.use("/cart",cart);

export default routerCustomer;