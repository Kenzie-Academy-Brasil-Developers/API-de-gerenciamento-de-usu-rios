
import { QueryResult } from "pg";
import format from "pg-format";
import { IUserRequest, IUserWithoutPassword  } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";
import { client } from './../../database/conection';

export const createUsersService = async (userData: IUserRequest): Promise<IUserWithoutPassword > => {

    const queryString: string = format(
        `
        INSERT INTO 
            users(%I)
        VALUES
            (%L)
        RETURNING 
           *
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: QueryResult<IUserWithoutPassword> = await client.query(queryString)
    
    const responseUser = returnUserSchema.parse(queryResult.rows[0])
    

    return responseUser

}