import { z } from "zod"
import { returnUserSchema, createUserSchema, UserSchema } from './../schemas/users.schemas';


export type IUser = z.infer<typeof UserSchema>
export type IUserRequest = z.infer<typeof createUserSchema>

export type IUserWithoutPassword = z.infer<typeof returnUserSchema>

export type IUsersWithoutPassword = IUserWithoutPassword[]



