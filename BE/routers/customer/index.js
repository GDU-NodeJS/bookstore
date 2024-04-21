import { Router } from "express";
import book from "./book/index.js";
import auth from "./Authen/index.js";
import categoryRouter from "./category/index.js";
const routerClient = Router();

routerClient.use("/book",book);
routerClient.use("/auth", auth);
routerClient.use("/category", categoryRouter);

export default routerClient;