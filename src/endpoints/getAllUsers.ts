import { Product } from './../types';
import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { User, Purchase } from '../types'
import { findUserPurchases } from '../functions/findUserPurchases'

export async function getAllUsers(req: Request, res: Response): Promise<void> {

    let errorCode = 500
    let arrayPurchases:Purchase[] = []
    let arrayNewUsers:any;
    try {
        const usersArray = await connection.raw(`
       SELECT * FROM labecommerce_users
       `)
      usersArray[0].map((user: User) => {
                        
      })
             
res.status(200).send()

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}
