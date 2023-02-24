import { hashSync } from "bcryptjs"
import { z } from "zod"

export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(3).max(20),
    email: z.string().email().min(5).max(120),
    password: z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    }),
    admin:z.optional(z.boolean()),
    active: z.boolean()
})

export const UserUpdateSchema = z.object({
    name: z.optional(z.string().min(3).max(20),),
    email: z.optional(z.string().email().min(5).max(120)),
    password: z.optional(z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    })),
})
export const createUserSchema = UserSchema.omit({ id: true, active: true})


export const returnUserSchema = UserSchema.omit({ password: true })


