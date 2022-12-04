import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { findUserPurchases } from '../functions/findUserPurchases'

export async function getUserPurchases(req: Request, res: Response): Promise<void> {

    let errorCode = 500

const userId = req.params.user_id
    let userAndPurchases=[]
    try {
        const findUser = await connection.raw(`
       SELECT * FROM labecommerce_users
       WHERE id = "${userId}"
       `)
       if(findUser[0].length <= 0){
        errorCode = 409
        throw new Error('Usuário inesistente')
       }else{ 
        let userInfo = findUser[0]    
        let purchases = await findUserPurchases(userId)
        let newUser = {userInfo,purchases: purchases}
        userAndPurchases.push(newUser)
       }
         
      res.status(200).send(userAndPurchases)
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}
