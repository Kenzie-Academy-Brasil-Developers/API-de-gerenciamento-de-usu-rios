import 'express-async-errors'
import express, { Application } from "express";
import usersRoutes from './routes/users.routes';
import { handleErrors } from "./errors"; 

const app: Application = express()
app.use(express.json())


app.use("/users", usersRoutes)


app.use(handleErrors)

export default app