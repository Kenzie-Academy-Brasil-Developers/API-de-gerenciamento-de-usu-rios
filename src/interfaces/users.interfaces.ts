import { z } from "zod"
import { returnUserSchema, createUserSchema } from './../schemas/users.schemas';


export type IUserRequest = z.infer<typeof createUserSchema>

export type IUserWithoutPassword = z.infer<typeof returnUserSchema>



