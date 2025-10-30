import express from 'express';
const userRouter = express.Router();

import { register, login, logout, authMe } from '../controllers/authControllers';

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/authme', authMe);

export default userRouter;