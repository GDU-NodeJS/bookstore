import mongoose from 'mongoose';
import express from "express";
import dotenv from 'dotenv';
import router from './routes/index.js'
import User from "./models/user.js";
import Role from "./models/role.js";
import role from './models/role.js';
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.static("."));
app.use("/api", router)

const mongoDBURL = process.env.mongoDBURL

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use((req, res, next) => {
  req.currentDate = new Date();
  next();
});

      // Tạo một người dùng mới
      const newUser = new User({
        lastName: "Phuc",
        firstName: "Thanh",
        email: "phuc@example.com",
        password: "password123",
        roles: "Admin"// Các vai trò có thể được thêm vào sau
      });
      

      // Lưu người dùng mới vào cơ sở dữ liệu
      const savedUser = await newUser.save();
  
    
  


export default app