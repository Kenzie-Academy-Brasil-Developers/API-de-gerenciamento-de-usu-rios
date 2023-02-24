import { QueryConfig } from 'pg';
import { client } from './../../database/conection';

export const deleteUsersService = async (idUser: number) => {

    const queryString: string = `
        UPDATE
            users
        SET
            active = false
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idUser]
    }

    await client.query(queryConfig)
}