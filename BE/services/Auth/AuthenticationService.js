import User from '../../models/auth/user.js'
import Bcrypt from 'bcryptjs'
import ErrorRepsonse from '../../responses/ErrorResponse.js';
import jwt from 'jsonwebtoken';
import UserService from '../User/UserService.js';
const userService = new UserService();
import crypto from 'crypto'
import MailService from './MailService.js';
import TokenRegistration from '../../models/auth/tokenregistration.js';
import CartService from "../CartService.js";
import Cart from "../../models/cart/cart.js";
const cartService = new CartService();
class AuthenticationService{

    constructor(){

    }

    static register = async (req) => {
        try {
          const user = await userService.findByEmail(req.body.email);
          if (user) {
            throw new ErrorRepsonse(400, 'Email already exists');
          }
  
          const hashedPassword = await Bcrypt.hash(req.body.password, 12);
          const userData = { ...req.body, password: hashedPassword };
          const savedUser = await userService.createUser(userData);
          
          if (!savedUser) {
            throw new ErrorRepsonse(500, 'Failed to create user');
          }
          
          
          const token = crypto.randomBytes(20).toString('hex');
          await TokenRegistration.create({ token, userEmail: req.body.email });
          
          const confirmationUrl = MailService.registration(token, req.body.email, req,"BookStore Registration");
          const newCart = new Cart({ user: savedUser._id, cartItems: [] });
          await cartService.createCart(newCart);
          return { savedUser, confirmationUrl };
        } catch (error) {
          if (error instanceof ErrorRepsonse) {
            throw error;
          } else {
            throw new ErrorRepsonse(500, 'Internal Server Error', error);
          }
        }
      };
    
    static authenticate = async(email, password) => {
        try {
            const user = await userService.findByEmail(email);
            if (!user) {
                throw new ErrorRepsonse(400, 'Email does not exist');
            }
            
            if (!user.isEnable) {
              throw new ErrorRepsonse(400, 'account has not been activated');
          }

            const validPassword = await Bcrypt.compare(password, user.password);
            
            if (!validPassword) {
                throw new ErrorRepsonse(400, 'Invalid email or password');
            }
    
            return { user };
        } catch (error) {
            throw error;
        }
    }

    
    static authenticateJWT = (req, res, next) => {
        try {
            const authorizationHeader = req.headers?.authorization;
            if (!authorizationHeader) {
               
                throw new ErrorRepsonse(401, 'Unauthorized');
            }
            
            const token = authorizationHeader.split(' ')[1];
            if (!token) {
                
                throw new ErrorRepsonse(401, 'Unauthorized');
            }
            
            const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
            req.user = decodedToken;
            next();
        } catch (err) {
            if(err.message ==='Unauthorized')
            {
                throw new ErrorRepsonse(401, 'Unauthorized');
            }
            else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
                throw new ErrorRepsonse(403, 'Invalid token');
            } else {
                console.error('Error :', err.message);
                throw new ErrorRepsonse(500, 'Internal Server Error');
            }
        }
    };
    
    static isAdmin = (req, res, next) => {
        if (req.user && req.user.role === 'Admin') {
            next();
        } else {
           throw new ErrorRepsonse(403, 'Unauthorized');
        }
    };
    
    static confirmRegistration = async (req, res) => {
        const { token } = req.params;
      
        // Tìm token trong collection TokenRegistration
        const tokenRegistration = await tokenRegistration.findOne({ token })
          .populate('userEmail')
          .exec();
      
        if (!tokenRegistration) {
          return res.status(400).send('Invalid Token');
        }
      
        // Kiểm tra token đã hết hạn hay chưa
        if (tokenRegistration.expiresAt < Date.now()) {
          await tokenRegistration.deleteOne({ token });
          return res.status(400).send('Token has expired');
        }
      
        // Kích hoạt tài khoản người dùng
        const user = tokenRegistration.userEmail;
        user.isEnabled = true;
        await user.save();
      
        // Xóa token khỏi collection TokenRegistration
        await tokenRegistration.deleteOne({ token });
      
        return {user} ; 
      };

        
}

       

export default  AuthenticationService 