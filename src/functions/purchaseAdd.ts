import { connection } from '../dataBase/connection'

export async function purchaseAdd(user_id: string, product_id: string, quantity: number, unitaryValue: number) {

    try {

        await connection.raw(`
             INSERT INTO labecommerce_purchases (id, user_id, product_id, quantity, total_price)
             VALUES(
             "${Date.now()}", 
             "${user_id}",
             "${product_id}",
             "${quantity}",
             "${Number(unitaryValue) * Number(quantity)}"  
             );
        `)
    } catch (error: any) {
        throw new Error(error.message);
    }
}
