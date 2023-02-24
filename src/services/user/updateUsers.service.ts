
import { QueryResult, QueryConfig } from "pg";
import { IUserRequest, IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";
import { client } from '../../database/conection';
import format from "pg-format";

export const updateUsersService = async (dataUserUpadate: any, idUser: number): Promise<IUserWithoutPassword> => {

    
    const queryString: string = format(`
        UPDATE
            users
        SET
          (%I) = ROW (%L)
        WHERE
            id = $1
          RETURNING *;
        `,
        Object.keys(dataUserUpadate),
        Object.values(dataUserUpadate)
    )
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idUser]
    }

    const queryResult: QueryResult<IUserRequest> = await client.query(queryConfig)

    const responseUser: IUserWithoutPassword = returnUserSchema.parse(queryResult.rows[0])

    return responseUser

}