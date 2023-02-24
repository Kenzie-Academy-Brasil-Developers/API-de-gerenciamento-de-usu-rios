import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import { ensureDataIsValid } from "../middlewares/validateBody.middlewares";
import { loginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post('', ensureDataIsValid(loginSchema), loginController )


export default loginRoutes