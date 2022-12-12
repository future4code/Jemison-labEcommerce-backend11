import { Request, Response } from "express";
import {
    withoutOrderAndSearch,
    withOrderAndWthoutSearch,
    withSearchAndWthoutOrder,
    withSearchAndWthOrder
} from '../functions/findAndOrderProducts'

export async function getAllProducts(req: Request, res: Response): Promise<void> {

    let errorCode = 500
    let result
    try {
        const orderVar = req.query.order as string
        const searchVar = req.query.search as string

        if (!orderVar && !searchVar) {
            result = await withoutOrderAndSearch()
        }
        if (!searchVar && orderVar) {
            if (orderVar.toLowerCase() !== 'asc' && orderVar.toLowerCase() !== 'desc') {
                errorCode = 422
                throw new Error('A ordenação precisa ser crescente "asc" ou decrescente "desc"')
            } else {
                result = await withOrderAndWthoutSearch(orderVar)
            }
        }
        if (searchVar && !orderVar) {
            result = await withSearchAndWthoutOrder(searchVar)
            if (result.length <= 0) {
                errorCode = 422
                throw new Error('Não existe um produto com este termo')
            }
        }
        if (searchVar && orderVar) {
            if (orderVar.toLowerCase() !== 'asc' && orderVar.toLowerCase() !== 'desc') {
                errorCode = 422
                throw new Error('A ordenação precisa ser crescente "asc" ou decrescente "desc"')
            } else {
                result = await withSearchAndWthOrder(searchVar, orderVar)
                if (result.length <= 0) {
                    errorCode = 422
                    throw new Error('Não existe um produto com este termo')
                }
            }
        }

        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}