// -- Third party imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// -- First party imports
import router from './routes/postRoutes';
import {connectDB} from './config/db';

// -- Load environment variables
dotenv.config();

// -- Configuration
const PORT = process.env.PORT || 8000;

// -- Server setup
const app = express();
app.use(cors());
app.use(express.json());

// -- DB connection
connectDB();

// -- Routes
app.use('/posts', router);

app.listen(PORT, ()=>{
    console.log('TypeScript server running on PORT ' + PORT);
});