import { Router } from "express";
import { createUsersController } from './../controllers/users.controllers';
import { checkIfUserExistsMiddleware } from '../middlewares/checkIfUserExists.iddleware ';

const usersRoutes: Router = Router();

usersRoutes.post('', checkIfUserExistsMiddleware, createUsersController)


export default usersRoutes