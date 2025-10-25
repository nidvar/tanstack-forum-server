import express from 'express';

const router = express.Router();

import Post from '../models/Post';

// types
type singlePost = {
    title: string
    content: string
    email: string
    username: string
    createdAt?: string
    updatedAt?: string
    tags?: []
}


// grab all posts
router.get('/', async (req, res)=>{
    const data: singlePost[] = await Post.find({});
    res.json(data);
});


// grab single posts
router.get('/:id', async (req, res)=>{
    const data: singlePost | null = await Post.findById({_id: req.params.id})
    res.json(data);
});


// post a single post
router.post('/', async (req, res)=>{
    try{
        const data: singlePost = {
            title: req.body.title,
            content: req.body.content,
            username: 'batman',
            email: 'bat@mail.com',
            tags: req.body.tags,
        };
        await Post.create(data);
        res.json({message: 'post request works'});
    }catch(error){
        console.log('create new post error ==> ', error)
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        await Post.findByIdAndDelete({_id: req.params.id});
        return res.json({message: 'post deleted'});
    }catch(error){
        console.log('delete post error ==> ', error)
    }
});

router.put('/:id', async (req, res)=>{
    const updatedData = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
    }
    try{
        await Post.findByIdAndUpdate(req.params.id, updatedData);
    }catch(error){
        console.log('delete post error ==> ', error)
    }
})

export default router;