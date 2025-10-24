import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    throw new Error('super error')
    res.json({message: 'getting all posts'});
});

router.get('/:id', (req, res)=>{
    res.json({message: 'getting single post'});
});

router.post('/', (req, res)=>{
    res.json({message: 'post request works'});
});

export default router;