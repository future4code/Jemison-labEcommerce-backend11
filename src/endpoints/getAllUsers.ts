import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { findUserPurchases } from '../functions/findUserPurchases'

export async function getAllUsers(req: Request, res: Response): Promise<void> {

    let errorCode = 500

    let userAndPurchases=[]
    try {
        const usersArray = await connection.raw(`
       SELECT * FROM labecommerce_users
       `)
      
      for(let user of usersArray[0]){
        let purchases = await findUserPurchases(user.id)
        let newUser = {user,purchases: purchases}
        userAndPurchases.push(newUser)
      } 
         
      res.status(200).send(userAndPurchases)
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}
