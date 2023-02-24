import { Request, Response } from "express";
import { createLogin } from "../services/login/createLogin.service";

export const loginController = async (req: Request, res: Response): Promise<Response> => {

    const token: string = await createLogin(req.body)

    return res.json({
        token: token
    })
}