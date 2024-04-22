import { Router } from "express";
import auth  from "./Authen/index.js";
import book from "./book/index.js";

const routerGuest = Router();


routerGuest.use("/auth", auth);
routerGuest.use("/book", book);
export default routerGuest;