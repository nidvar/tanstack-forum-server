import express from 'express';
const router = express.Router();

import { register } from '../controllers/userControllers';

router.post('/', register);

export default router;