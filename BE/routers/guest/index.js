import { Router } from "express";
import auth  from "./Authen/index.js";
import book from "./book/index.js";

import category from "./category/index.js";
const routerGuest = Router();

routerGuest.use("/auth", auth);
routerGuest.use("/book", book);
routerGuest.use("/category",category);

export default routerGuest;