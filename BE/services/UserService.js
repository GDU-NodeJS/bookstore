import User from "../models/auth/user.js"

class UserService{

    constructor() {
    
    }

    getAllUsers = async ()=>{
        const users = await User.find()
        if (users)
            return users;
        
    }
}
export default UserService;