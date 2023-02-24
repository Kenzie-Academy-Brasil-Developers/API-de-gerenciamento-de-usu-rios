import { Router } from "express";
import { getProfileController, getUsersController, postUsersController, updateProfileController, deleteProfileController, putRecoverProfileController } from './../controllers/users.controllers';
import { checkIfUserExistsMiddleware } from '../middlewares/checkIfUserExists.middleware';
import { ensureDataIsValid } from "../middlewares/validateBody.middlewares";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middlewares";
import { checkIfUserAdminMiddleware } from './../middlewares/checkIfUserAdmin.middleware';
import { createUserSchema, UserUpdateSchema } from "../schemas/users.schemas"
const usersRoutes: Router = Router();

usersRoutes.post('', checkIfUserExistsMiddleware, ensureDataIsValid(createUserSchema), postUsersController)
usersRoutes.get('', ensureTokenIsValid, checkIfUserAdminMiddleware, getUsersController)
usersRoutes.get('/profile', ensureTokenIsValid, getProfileController)
usersRoutes.patch('/:id', ensureTokenIsValid, ensureDataIsValid(UserUpdateSchema), updateProfileController)
usersRoutes.delete('/:id', ensureTokenIsValid, deleteProfileController)
usersRoutes.put('/:id/recover', ensureTokenIsValid, checkIfUserAdminMiddleware, putRecoverProfileController)


export default usersRoutes