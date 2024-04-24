import User from '../../models/auth/user.js'
import Bcrypt from 'bcryptjs'
import ErrorRepsonse from '../../responses/ErrorResponse.js';
import jwt from 'jsonwebtoken';
import UserService from '../User/UserService.js';
const userService = new UserService();
import crypto from 'crypto'
import MailService from './MailService.js';
import TokenRegistration from '../../models/auth/tokenregistration.js';
import CartService from "../../services/cart/CartServiceImp.js";
import Cart from "../../models/cart/cart.js";
const cartService = new CartService();
class AuthenticationService{

class AuthenticationService {
  constructor() {
    this.authServiceImp = new AuthenticationServiceImp();
  }

  async register(req) {
    return await this.authServiceImp.register(req);
  }

  async authenticate(email, password) {
    return await this.authServiceImp.authenticate(email, password);
  }

  authenticateJWT(req, res, next) {
    this.authServiceImp.authenticateJWT(req, res, next);
  }

  isAdmin(req, res, next) {
    this.authServiceImp.isAdmin(req, res, next);
  }

  async confirmRegistration(req, res) {
    return await this.authServiceImp.confirmRegistration(req, res);
  }
}

export default AuthenticationService;