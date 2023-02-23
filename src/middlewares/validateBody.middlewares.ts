import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

export const ensureDataIsValid = (schema: ZodTypeAny) => async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const validateDate = schema.parse(req.body)

    req.body = validateDate

    return next()

}