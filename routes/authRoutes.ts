import express from 'express';
const userRouter = express.Router();

import { register, login, logout } from '../controllers/authControllers';

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;