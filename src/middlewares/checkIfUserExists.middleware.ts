import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from '../database/conection';
import { AppError } from '../errors';

export const checkIfUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userEmail: string = req.body.email

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
    
    if (queryResult.rowCount >= 1 && req.method == "POST") {
        throw new AppError("E-mail already registered", 409)
    }
 
    return next()

}