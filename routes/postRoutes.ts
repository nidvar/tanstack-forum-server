import express from 'express';
const router = express.Router();

import {allPosts, singlePost, createSinglePost, deleteSinglePost, updateSinglePost} from '../controllers/postControllers'

import { requiresAuth } from '../middleware/requresAuth'

router.get('/', allPosts);
router.get('/:id', singlePost);

router.post('/', requiresAuth, createSinglePost);
router.delete('/:id', requiresAuth, deleteSinglePost);
router.put('/:id', requiresAuth, updateSinglePost);

export default router;