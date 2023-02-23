import { z } from "zod"

export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(3).max(20),
    email: z.string().email().min(5).max(120),
    password: z.string().max(120),
    admin: z.boolean(),
    active: z.boolean()
})

export const createUserSchema = UserSchema.omit({ id: true })

export const returnUserSchema = UserSchema.omit({ password: true })


