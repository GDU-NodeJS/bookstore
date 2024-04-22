import { Router } from "express";
import user from './user/index.js'
const routerAdmin = Router();
routerAdmin.use('/user',user)

export default routerAdmin;