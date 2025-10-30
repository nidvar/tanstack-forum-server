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
    try{
        const data: singlePostType[] = await Post.find({});
        res.json(data);
    }catch(error: any){
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
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
            username: req.body.username,
            email: req.body.email,
            tags: req.body.tags,
        };
        await Post.create(data);
        res.json({message: 'post request works'});
    }catch(error: any){
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
};

// delete a single post
export const deleteSinglePost = async function(req: Request, res: Response){
    try{
        await Post.findByIdAndDelete({_id: req.params.id});
        return res.json({message: 'post deleted'});
    }catch(error: any){
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
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
    }catch(error: any){
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
};