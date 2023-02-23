import { Request, Response } from "express";
import { IUserRequest, IUserWithoutPassword } from "../interfaces/users.interfaces";
import { createUsersService } from "../services/user/createUsers.service";

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {

    const userData: IUserRequest = req.body

    const newUser: IUserWithoutPassword = await createUsersService(userData)

    return res.status(201).json(newUser)
}