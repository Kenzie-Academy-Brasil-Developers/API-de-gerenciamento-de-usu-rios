
import { client } from './conection';

export const conectedDatabase  =async () => {
    await client.connect()
    console.log('Database connected!')
}