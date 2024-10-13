import dotenv from 'dotenv';
dotenv.config();  // Ensure dotenv is configured before using any env variables

import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import path from 'path';


import cookieParser from 'cookie-parser';

mongoose.connect(process.env.db_url)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => { 
    console.log('Database not connected', err.message);
  });
  const __dirname = path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());  // Cookie parser middleware

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
