import { Request, Response } from "express";

import User from '../models/User';

import bcrypt from "bcryptjs";

export const register = async function(req: Request, res: Response){
    try{

        const existingUser = await Promise.all([
            User.findOne({ email: req.body.email }),
            User.findOne({ username: req.body.username })
        ]);

        if(existingUser[0]){
            return res.status(409).json({ error: "Email already in use" });
        }
        if(existingUser[1]){
            return res.status(409).json({ error: "Username already in use" });
        }

        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hash
        };

        await User.create(user);
        return res.json({ message: 'User registered successfully' });
    }catch(error){
        console.log('register error ===>', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const login = async function(req: Request, res: Response){
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const ok = await bcrypt.compare(req.body.password, user.password);
            if(ok){
                return res.json({message:'login successful!'});
            }else{
                return res.status(409).json({error:'Incorrect username or password'});
            }
        }else{
            return res.status(409).json({error:'Incorrect username or password'});
        }
    }catch(error){
        console.log('login error ===>', error);
        return res.status(500).json({ error: 'Server error' });
    }
}