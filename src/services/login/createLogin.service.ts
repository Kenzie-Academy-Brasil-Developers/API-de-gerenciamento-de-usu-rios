import { QueryConfig } from 'pg';
import { IloginRequest, IloginResponse } from '../../interfaces/login.interfaces';
import { QueryResult } from 'pg';
import { client } from './../../database/conection';
import { AppError } from './../../errors';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createLogin = async (dataLogin: IloginRequest) => {

    const queryString: string = `
        SELECT
            *
        FROM 
            users
        WHERE
            email = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [dataLogin.email]
    }

    const queryResult: QueryResult<IloginResponse> = await client.query(queryConfig)

    
    if (queryResult.rowCount === 0) {
        throw new AppError("Wrong email or password ", 401)
    }

    const machPassword: boolean = await compare(dataLogin.password, queryResult.rows[0].password)

    if (!machPassword || !queryResult.rows[0].active) {
        throw new AppError("Wrong email or password ", 401)
    }

    const token = jwt.sign(
        {
            admin: queryResult.rows[0].admin,
            active: queryResult.rows[0].active
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: queryResult.rows[0].id.toString()
        }
    )

    return token
}