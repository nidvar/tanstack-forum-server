import express from 'express';
const router = express.Router();

import {allPosts, singlePost, createSinglePost, deleteSinglePost, updateSinglePost} from '../controllers/postControllers'

router.get('/', allPosts);

router.get('/:id', singlePost);

router.post('/', createSinglePost);

router.delete('/:id', deleteSinglePost);

router.put('/:id', updateSinglePost);

export default router;