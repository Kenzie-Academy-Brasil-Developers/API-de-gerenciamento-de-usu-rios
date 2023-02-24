import { Router } from "express";
import { createUsersController } from './../controllers/users.controllers';
import { checkIfUserExistsMiddleware } from '../middlewares/checkIfUserExists.middleware';
import { ensureDataIsValid } from "../middlewares/validateBody.middlewares";
import  { createUserSchema } from  "../schemas/users.schemas"
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middlewares";
const usersRoutes: Router = Router();

usersRoutes.post('', checkIfUserExistsMiddleware, ensureDataIsValid(createUserSchema), createUsersController)


export default usersRoutes