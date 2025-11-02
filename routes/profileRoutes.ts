import express from 'express';

const router = express.Router();

import { findProfile } from '../controllers/profileControllers';

router.get('/:id', findProfile);


export default router;
