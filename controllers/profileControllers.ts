import { Request, Response } from "express";

import User from '../models/User';
import Post from '../models/Post';

export const findProfile = async function(req: Request, res: Response){
    try{
        const user = await User.findOne({username: req.params.id});

        if(user){
            const postsData = await Promise.all([
                Post.find({ username: user.username }),
            ]);

            return res.json({
                username: user?.username || 'no-user-found',
                createdAt: user?.createdAt || '',
                profilePic: user?.profilePic || '',
                lastLogIn: user?.lastLogIn || '',
                posts: postsData[0]
            });
        }

    }catch(error){
        return res.status(500).json({message: error})
    }
}