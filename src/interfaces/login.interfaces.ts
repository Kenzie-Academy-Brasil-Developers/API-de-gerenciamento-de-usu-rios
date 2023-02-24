import { z } from "zod"
import { loginSchema } from "../schemas/login.schemas"
import { UserSchema } from "../schemas/users.schemas"


export type IloginRequest = z.infer<typeof loginSchema>

export type IloginResponse= z.infer<typeof UserSchema>



