import { Request, Response } from "express";
import { IUserRequest, IUsersWithoutPassword, IUserWithoutPassword } from "../interfaces/users.interfaces";
import { createUsersService } from "../services/user/createUsers.service";
import { getUsersService } from "../services/user/getUsers.service";
import { getProfileService } from './../services/user/getProfile.service';
import { AppError } from './../errors';
import { updateUsersService } from './../services/user/updateUsers.service';
import { deleteUsersService } from './../services/user/deleteUsers.service';
import { putRecoverUsersService } from './../services/user/putRecoverUsers.service';

export const postUsersController = async (req: Request, res: Response): Promise<Response> => {

    const userData: IUserRequest = req.body

    const newUser: IUserWithoutPassword = await createUsersService(userData)

    return res.status(201).json(newUser)
}

export const getUsersController = async (req: Request, res: Response): Promise<Response> => {

    const newUser: IUserWithoutPassword[] = await getUsersService()

    return res.status(200).json(newUser)
}

export const getProfileController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = req.user.idUser

    const newUser = await getProfileService(userId)

    return res.status(200).json(newUser)
}
export const updateProfileController = async (req: Request, res: Response): Promise<Response> => {

    if (req.user.idUser !== parseInt(req.params.id) && !req.user.admin) {
        throw new AppError("you are trying to upgrade a person who is not you", 400)
    }

    const newUser = await updateUsersService(req.body, parseInt(req.params.id))

    return res.status(201).json(newUser)
}

export const deleteProfileController = async (req: Request, res: Response): Promise<Response> => {

    if (req.user.idUser !== parseInt(req.params.id) && !req.user.admin) {
        throw new AppError("you are trying to delete a person who is not you", 400)
    }

    const newUser = await deleteUsersService(parseInt(req.params.id))

    return res.status(200).json(newUser)
}
export const putRecoverProfileController = async (req: Request, res: Response): Promise<Response> => {


    const newUser = await putRecoverUsersService(parseInt(req.params.id))

    return res.status(200).json(newUser)
}