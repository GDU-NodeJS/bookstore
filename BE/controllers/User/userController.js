
import UserService from '../../services/User/UserService.js';

class UserController {
    constructor(){
        this._UserService = new UserService();
    }

      async getUsers(req, res) {
        try {
          const books = await this._UserService.getAllUsers();
          return res.status(200).json({
            status: 200,
            message: "Successfully retrieved data",
            data: books,
          });
        } catch (err) {
          console.error('Error fetching users:', err);
          return res.status(500).send('Error retrieving users');
        }
      }
    
      async getUserById(req, res) {
        try {
          const userId = req.params.id;
          const user = await this._UserService.findById(userId);
          if (!user) {
            return res.status(404).json({
              status: 404,
              message: "user not found",
            });
          }
          return res.status(200).json({
            status: 200,
            message: "Successfully retrieved the user",
            data: user,
          });
        } catch (err) {
          console.error('Error fetching the user:', err);
          return res.status(500).send('Error retrieving the user');
        }
      }
    
      async updateUser(req, res) {
        try {
          const userEmail = req.params.email;
          const updateduser = req.body; // Assuming request body contains the updated book data
          await this._UserService.updateUser(userEmail, updateduser);
          return res.status(200).json({
            status: 200,
            message: "user updated successfully",
          });
        } catch (err) {
          console.error('Error updating the user:', err);
          return res.status(500).send('Error updating the user');
        }
      }
    
      async removeUser(req, res) {
        try {
          const userEmail = req.params.email;
          await adminBookService.removeUser(userEmail);
          return res.status(200).json({
            status: 200,
            message: "user removed successfully",
          });
        } catch (err) {
          console.error('Error removing the user:', err);
          return res.status(500).send('Error removing the user');
        }
      }
}

export default UserController