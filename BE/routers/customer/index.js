import { Router } from "express";
import book from "./book/index.js";
const routerClient = Router();

routerClient.use("/book",book);


export default routerClient;