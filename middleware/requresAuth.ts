import { NextFunction, Request, Response } from "express";
import { verifyToken } from '../utils/utils';

export const requiresAuth = async function(req: Request, res: Response, next: NextFunction){
    const accessToken = req.cookies.accessToken;
    if(accessToken){
        const verification: any = verifyToken(accessToken, 'access');
        if(verification){
            next();
        }
    }else{
        return res.json({ message: 'you are not logged in' });
    }
}