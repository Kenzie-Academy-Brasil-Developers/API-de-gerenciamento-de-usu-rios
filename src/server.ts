import app from "./app";
import { conectedDatabase } from './database/config';

app.listen(3000,async () => {
    await conectedDatabase()
    console.log('Server is running!')
})