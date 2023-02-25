
import { QueryConfig, QueryResult } from "pg";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from '../../database/conection';
import { returnUserSchema } from "../../schemas/users.schemas";

export const getProfileService = async (userId: number): Promise<IUserWithoutPassword> => {
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

    const queryResult: QueryResult<IUserWithoutPassword> = await client.query(queryConfig)


    const responseUser = returnUserSchema.parse(queryResult.rows[0])

    return responseUser
}