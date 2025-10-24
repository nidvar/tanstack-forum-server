//Third party imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//First party imports
import router from './routes/postRoutes';
import {connectDB} from './config/db';

const PORT = process.env.PORT || 8000;

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());







app.use('/posts', router);


app.listen(PORT, ()=>{
    console.log('TypeScript server running on PORT ' + PORT);
})