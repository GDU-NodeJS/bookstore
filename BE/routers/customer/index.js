import { Router } from "express";
import book from "./book/index.js";
import category from "./category/index.js";
const routerClient = Router();

routerClient.use("/book",book);
routerClient.use("/category",category);


export default routerClient;