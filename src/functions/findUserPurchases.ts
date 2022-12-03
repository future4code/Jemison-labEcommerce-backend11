import { connection } from '../dataBase/connection'


export async function findUserPurchases(id: string){
    try{
   const result = await connection.raw(`
    SELECT id, product_id, quantity, total_price  FROM labecommerce_purchases
    WHERE user_id = "${id}";
    
`)
return result[0]
} catch (error: any) {
    throw new Error(error.message);
  }
}

