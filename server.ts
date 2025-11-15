// -- Third party imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// -- Load environment variables
dotenv.config();

// -- First party imports
import profileRouter from './routes/profileRoutes'
import router from './routes/postRoutes';
import userRouter from './routes/authRoutes';
import { connectDB } from './config/db';

// -- Configuration
const PORT = process.env.PORT || 8000;

// -- Server setup
const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://jmern.vercel.app'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow requests with no origin (like Postman) or allowed origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// -- DB connection
connectDB();

// -- Routes
app.use('/profile', profileRouter);
app.use('/posts', router);
app.use('/', userRouter);

app.get("/", (_req, res) => {
  res.send("Server running successfully 🚀");
});

app.listen(PORT, () => {
    console.log('TypeScript server running on PORT ' + PORT);
});
