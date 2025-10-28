import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '10m';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '3h';

export const generateToken = function(payload: object, type: string){
    if(type === 'access'){
        return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_EXPIRES_IN as any});
    }else if(type === 'refresh'){
        return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_EXPIRES_IN as any});
    }else{
        throw new Error('Invalid Token');
    }
}

export const verifyToken = function(payload: string, type: string){
    if(type === 'access'){
        return jwt.verify(payload, JWT_ACCESS_SECRET);
    }else if(type === 'refresh'){
        return jwt.verify(payload, JWT_REFRESH_SECRET);
    }else{
        throw new Error('Invalid Token');
    }
}

export const clearCookie = function(response: any, name: string){
    response.clearCookie(name ,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
}

export const createNewCookie = function(response: any, name: string, token: string, age: number): void{
    response.cookie(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: age,
    });
}