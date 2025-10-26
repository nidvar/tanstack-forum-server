import { Request, Response } from "express";

import User from '../models/User';

import bcrypt from "bcryptjs";

export const checkPassword = function(password:String){
    console.log(password);
}

export const register = async function(req: Request, res: Response){
    try{
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hash
        }

        User.create(user);
    }catch(error){
        console.log('register error ===>', error);
        return res.json(error)
    }
};

export const login = async function(req: Request, res: Response){
    try{
        console.log('body ====================== ',req.body);
    }catch(error){
        console.log('login error ===>', error);
    }
}