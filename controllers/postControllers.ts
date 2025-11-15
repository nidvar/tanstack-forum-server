import Post from '../models/Post';
import { Request, Response } from "express";
import User from '../models/User';

import { uploadToCloudinary, deleteImageFromCloudinary } from '../utils/utils';

// types
type singlePostType = {
    title: string
    content: string
    email: string
    username: string
    createdAt?: string
    updatedAt?: string
    tags?: []
    img:{
        url: string | undefined,
        public_id: string
    }
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
    try{
        const post: singlePostType | null = await Post.findById({_id: req.params.id});
        if(!post){
            throw new Error('no post found');
        };
        return res.json(post);
    }catch(error: any){
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
};

// post a single post
export const createSinglePost = async function(req: Request, res: Response){
    try{
        const user = await User.findOne({ email: res.locals.email});
        if(user){
            const imageURL = await uploadToCloudinary(req.body.img.url);
            const data: singlePostType = {
                title: req.body.title,
                content: req.body.content,
                username: user.username,
                email: user.email,
                tags: req.body.tags,
                img: {
                    url: imageURL?.secure_url || '',
                    public_id: imageURL?.public_id || ''
                }
            };
            await Post.create(data);
            res.json({message: 'post request works'});
        }else{
            throw new Error('user not found while creating single post')
        }
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
        const deletedPost = await Post.findByIdAndDelete({_id: req.params.id});
        if(deletedPost?.img?.public_id){
            deleteImageFromCloudinary(deletedPost.img.public_id);
        }
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
        return res.json({message: 'message edited'});
    }catch(error: any){
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
};

export const addComment = async function(req: Request, res: Response){
    const post = await Post.findOne({_id: req.body.postId});
    if(!post){
        return res.status(500).json({message:'post not found'});
    }
    post.comments.push(req.body);
    await post.save();
    return res.json({message: 'comment recieved'})
}

export const likeOrDislike = async function(req: Request, res: Response){
    console.log('=========== body ' + Math.random(), req.body);

    return res.json({message: 'working!'})
};

export const deleteComment = async function(req: Request, res: Response){
    const post = await Post.findOne({ _id: req.body.postId});

    if(!post){
        return res.status(500).json({message: 'post not found'})
    }

    post.comments.pull({ _id: req.params.id });
    await post.save();

    return res.json({message: 'comment deleted'})
}