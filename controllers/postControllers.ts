import Post from '../models/Post';
import { Request, Response } from "express";

// types
type singlePostType = {
    title: string
    content: string
    email: string
    username: string
    createdAt?: string
    updatedAt?: string
    tags?: []
}

// grab all posts
export const allPosts = async function(req: Request, res: Response){
    const data: singlePostType[] = await Post.find({});
    res.json(data);
}

// grab single posts
export const singlePost = async function(req: Request, res: Response){
    const data: singlePostType | null = await Post.findById({_id: req.params.id})
    res.json(data);
};

// post a single post
export const createSinglePost = async function(req: Request, res: Response){
    try{
        const data: singlePostType = {
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
};

// delete a single post
export const deleteSinglePost = async function(req: Request, res: Response){
    try{
        await Post.findByIdAndDelete({_id: req.params.id});
        return res.json({message: 'post deleted'});
    }catch(error){
        console.log('delete post error ==> ', error)
    }
};

// update a single post
export const updateSinglePost = async function(req: Request, res: Response){
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
};