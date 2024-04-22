import { Router } from "express";
import auth  from "./Authen/index.js";
import category from "./category/index.js";
const routerGuest = Router();


routerGuest.use("/auth", auth);
routerGuest.use("/category",category);
export default routerGuest;