import { NextFunction, Request, Response } from "express";

import { generateToken, clearCookie, createNewCookie, verifyToken } from '../utils/utils';

export const requiresAuth = async function(req: Request, res: Response, next: NextFunction){
    try{
        const accessToken = req.cookies.accessToken;
        const verification: any = verifyToken(accessToken, 'access');
        if(verification){
            res.locals.email = verification.email
            next();
        }
    }catch(error){
        try{
            const refreshToken = req.cookies.refreshToken;
            const verification: any = verifyToken(refreshToken, 'refresh');
            if(verification){
                const accessToken = generateToken({id: verification._id, email: verification.email}, 'access');
                createNewCookie(res, 'accessToken', accessToken, 10 * 60 * 1000);
                res.locals.email = verification.email;
                next();
            }
        }catch(error){
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }
};