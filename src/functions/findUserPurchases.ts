import { connection } from '../dataBase/connection'


export async function findUserPurchases(id: string){
    try{
   const result = await connection.raw(`
   SELECT purchases.id AS purchase_id, prdct.id AS product_id, prdct.name AS product_name, prdct.price AS unitary_value, purchases.quantity, purchases.total_price 
   FROM labecommerce_purchases as purchases
   INNER JOIN labecommerce_products AS prdct ON purchases.product_id = prdct.id 
   WHERE purchases.user_id = "${id}";    
`)
return result[0]
} catch (error: any) {
    throw new Error(error.message);
  }
}

