
import UserService from '../services/User/UserService.js';

class UserController {
    constructor(){
        this._UserService = new UserService();
    }
    
    async getUsers(req, res) {
        try {
             // Tạo một thể hiện của BookService
            const users = await this._UserService.getAllUsers(); 
            return res.status(200).json({
              status: 200,
              message: "Successfully retrieved data",
              data: users
            });
        } catch (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Error retrieving users');
        }
      }
}

export default UserController