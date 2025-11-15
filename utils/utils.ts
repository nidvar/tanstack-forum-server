import jwt from 'jsonwebtoken';
import { runCloudinary } from '../lib/cloudinary';

const secretCheck = function(){
    if(process.env.JWT_ACCESS_SECRET == undefined || process.env.JWT_REFRESH_SECRET == undefined){
        throw new Error('env did not load variables')
    }
}

export const generateToken = function(payload: object, type: string){
    secretCheck();
    if(type === 'access'){
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '10m'});
    }else if(type === 'refresh'){
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '3h'});
    }else{
        throw new Error('Invalid Token');
    }
}

export const verifyToken = function(payload: string, type: string, login?: string){
    secretCheck();
    if(login === 'login'){
        try{
            return jwt.verify(payload, process.env.JWT_ACCESS_SECRET!);
        }catch(error){
            return null
        }
    };
    if(type === 'access'){
        return jwt.verify(payload, process.env.JWT_ACCESS_SECRET!);
    }else if(type === 'refresh'){
        return jwt.verify(payload, process.env.JWT_REFRESH_SECRET!);
    }else{
        // IMPORTANT !!! MUST THROW ERROR for middleware !
        throw new Error('Invalid Token');
    }
}

export const createNewCookie = function(response: any, name: string, token: string, age: number): void {
    response.cookie(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // HTTPS required in prod
        sameSite: 'none',                               // allow cross-origin
        maxAge: age,
        path: '/',                                     // ensure cookie is available across backend
    });
}

export const clearCookie = function(response: any, name: string) {
    response.clearCookie(name, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
    });
}

export const uploadToCloudinary = async function(image: string){
    try{
        const cloud = runCloudinary();
        const res = await cloud.uploader.upload(image);
        if(res){
            return res.secure_url;
        }else{
            return null
        }
    }catch(error){
        console.log('cloudinary error', error)
    }
}
