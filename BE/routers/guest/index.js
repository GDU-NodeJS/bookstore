import { Router } from "express";
import auth  from "./Authen/index.js";

const routerGuest = Router();

routerGuest.use("/auth", auth);
export default routerGuest;