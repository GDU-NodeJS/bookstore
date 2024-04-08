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

    
  


export default app