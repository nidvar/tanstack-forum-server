import { Request, Response } from "express";

import User from '../models/User';

export const findProfile = async function(req: Request, res: Response){
    try{
        const userData = await User.findOne({username: req.params.id});
        if(!userData){
            throw new Error('error finding profile')
        }
        return res.json({
            username: userData?.username || '',
            createdAt: userData?.createdAt || '',
            profilePic: userData?.profilePic || '',
            lastLogIn: userData?.lastLogIn || ''
        });
    }catch(error){
        return res.status(500).json({message: error})
    }
}