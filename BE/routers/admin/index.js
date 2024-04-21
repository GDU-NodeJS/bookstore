import { Router } from "express";
import user from './user/index.js'
import categoryRouter from "./category/index.js";
const routerAdmin = Router();
routerAdmin.use('/user',user)
routerAdmin.use('/category',categoryRouter);
export default routerAdmin;