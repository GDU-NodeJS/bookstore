import { Router } from "express";
import UserController  from "../../../controllers/User/userController.js";


const user = Router();
const userController = new UserController()
user.get('/getAll',userController.getUsers.bind(userController))

export default user;