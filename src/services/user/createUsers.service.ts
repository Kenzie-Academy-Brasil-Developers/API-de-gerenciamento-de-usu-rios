
import { QueryResult } from "pg";
import format from "pg-format";
import { IUserRequest, IUserWithoutPassword  } from "../../interfaces/users.interfaces";
import { client } from './../../database/conection';

export const createUsersService = async (userData: IUserRequest): Promise<IUserWithoutPassword > => {

    const queryString: string = format(
        `
        INSERT INTO 
            users(%I)
        VALUES
            (%L)
        RETURNING 
            id,name,email,admin,active
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: QueryResult<IUserWithoutPassword > = await client.query(queryString)

    return queryResult.rows[0]

}