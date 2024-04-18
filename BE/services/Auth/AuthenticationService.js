import User from '../../models/auth/user.js'
import Bcrypt from 'bcryptjs'
import ErrorRepsonse from '../../responses/ErrorResponse.js';
import jwt from 'jsonwebtoken';
import UserService from '../User/UserService.js';
const userService = new UserService();

class AuthenticationService{

    constructor(){

    }

    static register = async(bodyData) => {
        try {
            const user = await userService.findByEmail(bodyData.email);
            if (user) {
                throw new ErrorRepsonse(400, 'Email already exists');
            }
    
            const hashedPassword = await Bcrypt.hash(bodyData.password, 12);
            const userToCreate = { ...bodyData, password: hashedPassword };
            const savedUser = await userService.create(userToCreate);
    
            return { savedUser };
        } catch (error) {
            throw error;
        }
    }
    
    static authenticate = async(email, password) => {
        try {
            const user = await userService.findByEmail(email);
            if (!user) {
                throw new ErrorRepsonse(400, 'Email does not exist');
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
    
    

        
}

       

export default  AuthenticationService 