import { Router } from "express";
import book from "./book/index.js";
import auth from "./Authen/index.js";
const routerClient = Router();

routerClient.use("/book",book);
routerClient.use("/auth", auth);

export default routerClient;