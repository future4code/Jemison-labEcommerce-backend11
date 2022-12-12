import { connection } from '../dataBase/connection'

export async function productAdd(name: string, price: number, imageUrl: string) {

    try {
        await connection.raw(`
            INSERT INTO labecommerce_products (id, name, price, image_url)
            VALUES(
            "${Date.now()}", 
            "${name}",
            "${price}",
            "${imageUrl}"  
             );
        `)
    } catch (error: any) {
        throw new Error(error.message);
    }
}
