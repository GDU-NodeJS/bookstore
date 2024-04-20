
import jwt from 'jsonwebtoken'
import AuthService from '../../services/Auth/AuthenticationService.js';



export async function signup(req, res, next) {
    try {
        const { error, savedUser } = await AuthService.register(req.body);

        if (error) {
            throw error; // Chuyển lỗi cho middleware xử lý lỗi
        }

        res.json({
            status: 201,
            message: "Successfully register ",
            data: {
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                role: savedUser.role
            }
        });
    } catch (error) {
        next(error); // Xử lý lỗi trong middleware xử lý lỗi
    }
}

export async function signin(req, res, next) {
    try {
        const { email, password } = req.body;
        const { error, user } = await AuthService.authenticate(email, password);

        if (error) {
            throw error; // Chuyển lỗi cho middleware xử lý lỗi
        }

        const key = process.env.JWT_SECRETKEY;
        const token = jwt.sign({ email, role: user.role }, key, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        res.json({
            status: 200,
            message: "Successfully login ",
            token: token,
            data: [{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }]
        });
    } catch (error) {
        next(error); // Xử lý lỗi trong middleware xử lý lỗi
    }
}

export const authenticateJWT = async (req, res, next) => {
    try {
        AuthService.authenticateJWT(req, res, next);
    } catch (error) {
        next(error);
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        AuthService.isAdmin(req, res, next);
    } catch (error) {
        next(error);
    }
};

