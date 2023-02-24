
import { QueryConfig, QueryResult } from "pg";
import { IUserRequest } from "../../interfaces/users.interfaces";
import { client } from '../../database/conection';

export const getProfileService = async (userId: number): Promise<IUserRequest> => {
    const queryString: string =
        `
        SELECT
           *
        FROM
           users
        WHERE 
            id= $1
        `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: QueryResult<IUserRequest> = await client.query(queryConfig)

    return queryResult.rows[0]

}