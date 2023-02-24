import { QueryConfig } from 'pg';
import { client } from '../../database/conection';
import { QueryResult } from 'pg';
import { IUser } from '../../interfaces/users.interfaces';
import { AppError } from './../../errors';

export const putRecoverUsersService = async (idUser: number) => {

    let queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            id = $1;
    `

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [idUser]
    }

    const queryResult: QueryResult<IUser> = await client.query(queryConfig)

    if (queryResult.rowCount <= 0) {
        throw new AppError("User nort exist", 400)
    }

    if (queryResult.rows[0].active) {
        throw new AppError("User already active", 400)
    }

    queryString = `
        UPDATE
            users
        SET
            active = true
        WHERE
            id = $1;
    `

    queryConfig = {
        text: queryString,
        values: [idUser]
    }

    await client.query(queryConfig)
}