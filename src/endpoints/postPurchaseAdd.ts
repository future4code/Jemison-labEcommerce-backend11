import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { Purchase, User, Product } from '../types'
import { purchaseAdd } from "../functions/purchaseAdd";


export async function postPurchaseAdd(req: Request, res: Response): Promise<void> {

    let errorCode = 500

    try {
        const { user_id, product_id, quantity, }: Purchase = req.body

        if (!user_id) {
            errorCode = 422
            throw new Error('Falta o usuário que está realizando a compra')
        }
        if (!product_id) {
            errorCode = 422
            throw new Error('Falta o id do produto que está sendo comprado')
        }
        if (!quantity || typeof (quantity) != 'number') {
            errorCode = 422
            throw new Error('Quantidade de produtos faltando ou quantidade inválida')
        }

        const usersArray = await connection.raw(`
        SELECT * FROM labecommerce_users
        WHERE id = "${user_id}"
        `)
        if (usersArray[0].length <= 0) {
            errorCode = 409
            throw new Error('Usuário inesistente')
        }
        const productsArray = await connection.raw(`
        SELECT * FROM labecommerce_products
        WHERE id = "${product_id}"
        `)
        if (productsArray[0].length <= 0) {
            errorCode = 409
            throw new Error('Produto inesistente')
        } else {
            const unitaryValue = productsArray[0].map((product: Product) => {
                return Number(product.price)
            })

            await purchaseAdd(user_id, product_id, quantity, unitaryValue)
        }

        res.status(200).send('Compra realizada com sucesso!')

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}
