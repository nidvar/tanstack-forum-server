import express from 'express';
const router = express.Router();

import {allPosts, singlePost, createSinglePost, deleteSinglePost, updateSinglePost, likeOrDislike} from '../controllers/postControllers'

import { requiresAuth } from '../middleware/requresAuth'

router.get('/', allPosts);
router.get('/:id', singlePost);

router.post('/:id/likeOrDisLike/:likeOrDislike', requiresAuth, likeOrDislike);

router.post('/', requiresAuth, createSinglePost);
router.delete('/:id', requiresAuth, deleteSinglePost);
router.put('/:id', requiresAuth, updateSinglePost);

export default router;