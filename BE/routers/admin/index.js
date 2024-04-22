import { Router } from "express";
import user from './user/index.js'
import categoryRouter from "./category/index.js";
import bookRouter from "./book/index.js"

const routerAdmin = Router();

routerAdmin.use('/user',user)
routerAdmin.use('/category',categoryRouter);
routerAdmin.use('/book', bookRouter)

export default routerAdmin;