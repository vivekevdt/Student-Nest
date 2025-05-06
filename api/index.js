import dotenv from 'dotenv';
dotenv.config();  // Ensure dotenv is configured before using any env variables
import cors from 'cors';


import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import path from 'path';


import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3000;


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
app.use(cors());

// Or, to enable CORS for specific origins:
app.use(cors({
  origin: ['http://localhost:5173', 'https://student-nest-web-vivek.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));


// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

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

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

