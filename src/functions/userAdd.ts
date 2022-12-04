import { connection } from '../dataBase/connection'

export async function userAdd(name: string, email: string, password: string) {

    try {

        await connection.raw(`
             INSERT INTO labecommerce_users (id, name, email, password)
             VALUES(
             "${Date.now()}", 
             "${name}",
             "${email}",
             "${password}"  
             );
        `)
    } catch (error: any) {
        throw new Error(error.message);
    }
}

