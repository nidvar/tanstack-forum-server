import {Request, Response } from 'express';

import User from '../models/User';
import Post from '../models/Post';
import {Comment} from '../models/Comment';

import { generateToken, clearCookie, createNewCookie, verifyToken, uploadToCloudinary } from '../utils/utils';

import bcrypt from 'bcryptjs';

const getUserData = async function(email:string){
    const userData = await Promise.all([
        Post.find({ email: email }),
        Comment.find({ email: email }),
        User.findOne({ email: email })
    ]);

    return {
        username: userData[2]?.username,
        email: email,
        profilePic: userData[2]?.profilePic,
        postsData: [
            userData[0],
            userData[1],
            userData[2]
        ]
    }
}

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

        const imageURL = await uploadToCloudinary(req.body.profilePic);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hash,
            profilePic: imageURL?.secure_url || 'https://robohash.org/4.123123=' + Math.random()*10
        };

        await User.create(user);
        return res.json({ message: 'User registered successfully' });
    }catch(error){
        return res.status(500).json({ error: 'Server error' });
    }
};

export const login = async function(req: Request, res: Response){
    try{
        if(req.cookies.accessToken){
            const verification = verifyToken(req.cookies.accessToken, 'access', 'login');
            if(verification != null){
                return res.status(409).json({error:'Already logged In'});
            }
        }
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(409).json({error:'Incorrect username or password'});
        }

        const ok = await bcrypt.compare(req.body.password, user.password);

        if(ok){
            const accessToken = generateToken({id: user._id, email: user.email}, 'access');
            createNewCookie(res, 'accessToken', accessToken, 10 * 60 * 1000);

            const refreshToken = generateToken({id: user._id, email: user.email}, 'refresh');
            createNewCookie(res, 'refreshToken', refreshToken, 3* 60 * 60 * 1000);

            user.refreshToken.push(refreshToken);

            user.lastLogIn = new Date();

            await user.save();

            return res.json({message:'login successful!', data: await getUserData(user.email)});

        }else{
            return res.status(409).json({error:'Incorrect username or password'});
        }
    }catch(error){
        return res.status(500).json({ error: 'Server error' });
    }
}

export const logout = async function(req: Request, res: Response){
    try{
        const user = await User.findOne({refreshToken: req.cookies.refreshToken});
        if (user) {
            user.refreshToken = [];
            await user.save();
        }
        clearCookie(res, 'refreshToken');
        clearCookie(res, 'accessToken');

        return res.json({message: 'logged out'});

    }catch(error){
        return res.status(500).json({error: 'logout error'})
    }
}

export const authMe = async function(req: Request, res: Response){
    try{
        const accessToken = req.cookies.accessToken;
        const verification: any = verifyToken(accessToken, 'access');
        if(verification){
            res.locals.email = verification.email
            return res.json({ loggedIn: true, data: await getUserData(verification.email) });
        }
    }catch(error){
        try{
            const refreshToken = req.cookies.refreshToken;
            const verification: any = verifyToken(refreshToken, 'refresh');
            if(verification){
                const user = await User.findOne({refreshToken: req.cookies.refreshToken});
                if (user) {
                    const accessToken = generateToken({id: verification._id, email: verification.email}, 'access');
                    createNewCookie(res, 'accessToken', accessToken, 10 * 60 * 1000);
                    res.locals.email = verification.email;
                    return res.json({ loggedIn: true, data: await getUserData(verification.email) });
                }
            }
        }catch(error){
            return res.json({ loggedIn:null });
        }
    }
}
