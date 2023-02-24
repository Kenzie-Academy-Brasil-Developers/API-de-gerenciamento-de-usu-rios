import { Router } from "express";
import { checkIfUserExistsMiddleware } from '../middlewares/checkIfUserExists.middleware';
import { ensureDataIsValid } from "../middlewares/validateBody.middlewares";
import { createUserSchema } from "../schemas/users.schemas"

const loginRoutes: Router = Router();

loginRoutes.post('', checkIfUserExistsMiddleware, ensureDataIsValid(createUserSchema), )


export default loginRoutes