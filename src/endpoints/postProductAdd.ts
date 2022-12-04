import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { Product } from '../types'
import { productAdd } from "../functions/productAdd";


export async function postProductAdd(req: Request, res: Response): Promise<void> {

    let errorCode = 500

    try {
        const { name, price, imageUrl }: Product = req.body

        if (!name) {
            errorCode = 422
            throw new Error('Nome do produto faltando')
        }
        if (!price || typeof (price) != 'number') {
            errorCode = 422
            throw new Error('Valor do produto faltando ou valor inválido')
        }
        if (!imageUrl) {
            errorCode = 422
            throw new Error('Imagem do produto faltando')
        }
        const productsArray = await connection.raw(`
        SELECT * FROM labecommerce_products
        `)
        const nameExist = productsArray[0].find((product: Product) => {
            return product.name.toLowerCase() === name.toLowerCase()
        })

        if (nameExist) {
            errorCode = 409
            throw new Error('Já existe um produto com este nome')
        } else {
            productAdd(name, price, imageUrl)
        }

        res.status(200).send('Produto criado com sucesso')

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}
