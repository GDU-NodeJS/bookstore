import {Router} from 'express'
import {signin,signup} from '../../../controllers/AuthController.js';

const auth = new Router();

auth.post('/register',signup)
auth.post('/authenticate',signin)
export default auth
