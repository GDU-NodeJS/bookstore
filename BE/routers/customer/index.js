import { Router } from "express";
import book from "./book/index.js";
import auth from "./Authen/index.js";
import cart from "./cart/index.js"
const routerClient = Router();

routerClient.use("/book",book);
routerClient.use("/auth", auth);
routerClient.use("/cart",cart);

export default routerClient;