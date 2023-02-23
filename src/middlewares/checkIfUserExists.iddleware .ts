import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from '../database/conection';
import { AppError } from '../errors';

export const checkIfUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userEmail: string = req.body.email

    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        throw new AppError("Endereço de e-mail inválido", 400)
    }

    const queryString: string = `
        SELECT
            *
        FROM 
            users 
        WHERE
            email = $1
        ;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userEmail]
    }

    const queryResult: QueryResult = await client.query(queryConfig)
    console.log(queryResult.rowCount);
    
    if (queryResult.rowCount >= 1) {
        throw new AppError("E-mail already registered", 409)
    }

    return next()

}