import { Router } from "express";
import UserController  from "../../controllers/UserController.js";


const user = Router();
const userController = new UserController()
user.get('/getAll',userController.getUsers.bind(userController))

export default user;