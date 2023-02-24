import { NextFunction, Request, Response } from "express";
import { AppError } from './../errors';
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const ensureTokenIsValid = (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if (!token) {
        throw new AppError("Missing Bearer Token", 401)
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decode: any) => {

        if (error) {
            throw new AppError(error.message, 401)
        }


        req.user = {
            admin: decode.admin,
            active: decode.active,
            idUser: parseInt(decode.sub),

        }
        next()
    })


}