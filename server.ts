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
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

// -- DB connection
connectDB();

// -- Routes
app.use('/profile', profileRouter);
app.use('/posts', router);
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log('TypeScript server running on PORT ' + PORT);
});