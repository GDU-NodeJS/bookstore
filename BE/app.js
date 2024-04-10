import mongoose from 'mongoose';
import express from "express";
import dotenv from 'dotenv';
import routerClient from '../router/customer/index.js';
import routerUser from '../router/guest/index.js';
import routerAdmin from '../router/admin/index.js';
import cors from 'cors';
import ErrorResponse from './responses/ErrorResponse.js';
import {authenticateJWT, isAdmin} from './controllers/AuthController.js';
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("."));
app.use("/api/client", routerClient);
// Middleware cho các yêu cầu tới /api/user
app.use("/api/user", authenticateJWT, routerUser);
// Middleware cho các yêu cầu tới /api/admin
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