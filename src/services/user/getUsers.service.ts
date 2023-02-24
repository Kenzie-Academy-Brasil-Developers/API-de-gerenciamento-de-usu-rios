
import { QueryResult } from "pg";
import { IUserRequest, IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";
import { client } from '../../database/conection';

export const getUsersService = async (): Promise<IUserWithoutPassword[]> => {
    const queryString: string =
        `
        SELECT
           *
        FROM
           users
        `

    const queryResult: QueryResult<IUserRequest> = await client.query(queryString)

    const responseUser: IUserWithoutPassword[] = queryResult.rows.map(user => returnUserSchema.parse(user))

    return responseUser

}