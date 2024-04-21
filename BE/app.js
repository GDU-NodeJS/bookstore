import mongoose from 'mongoose';
import express from "express";
import dotenv from 'dotenv';
import routerCustomer from './routers/customer/index.js';
import routerGuest from './routers/guest/index.js';
import routerAdmin from './routers/admin/index.js'
import cors from 'cors';
import {authenticateJWT, isAdmin} from './controllers/Auth/AuthController.js';
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("."));
app.use("/api/client", routerGuest);
// Middleware cho các yêu cầu tới /api/user
app.use("/api/user", authenticateJWT, routerCustomer);
// Middleware cho các yêu cầu tới /api/admincd 
app.use("/api/admin", authenticateJWT, isAdmin, routerAdmin);
app.use((err, req, res, next) => {
  console.log(err.status);
  err.statusCode = err.status ||500;
  err.status = err.status || 'error' ;

  res.status(err.statusCode).json({
    status: err.status,
    message:err.message,
  });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

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