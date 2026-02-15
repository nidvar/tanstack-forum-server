// -- Third party imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// -- Load environment variables
dotenv.config();

// -- First party imports
import profileRouter from './routes/profileRoutes';
import router from './routes/postRoutes';
import userRouter from './routes/authRoutes';
import { connectDB } from './config/db';

// -- Configuration
const PORT = process.env.PORT || 8000;

// -- Server setup
const app = express();

// -- Handle CORS
const allowedOrigins = [
  'http://localhost:3000',      // frontend dev
  'https://jmern.vercel.app'    // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// -- Middleware
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// -- Database connection
connectDB();

// -- API Routes
app.use('/profile', profileRouter);
app.use('/posts', router);
app.use('/', userRouter);

// -- Serve frontend static files
// __dirname works in CommonJS
const clientBuildPath = path.join(__dirname, 'client');
app.use(express.static(clientBuildPath));

// SPA catch-all route
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// -- Start server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} 🚀`);
});
