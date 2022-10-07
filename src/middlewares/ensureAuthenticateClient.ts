import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticateClient(request:Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({
            message: 'Token is missing!'
        })
    }

    //Bearer tokeaiweuhaIWUEHawieuh
    const [bearer,token] = authHeader.split(' ')

    try {
        const {sub } = verify(token, '10af1f8c756a2ccd0e3f321fa0a7b335') as IPayLoad;

        request.id_client = sub;
        console.log(sub)

        return next();
    } catch (error) {
        return response.status(401).json({
            message: 'Invalid token!'
        })
    }

}

