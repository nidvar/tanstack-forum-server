import jwt from 'jsonwebtoken';

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

export const verifyToken = function(payload: string, type: string){
    secretCheck();
    if(type === 'access'){
        return jwt.verify(payload, process.env.JWT_ACCESS_SECRET!);
    }else if(type === 'refresh'){
        return jwt.verify(payload, process.env.JWT_REFRESH_SECRET!);
    }else{
        throw new Error('Invalid Token');
    }
}

export const clearCookie = function(response: any, name: string){
    response.clearCookie(name, {
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