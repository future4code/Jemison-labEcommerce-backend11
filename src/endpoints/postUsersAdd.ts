import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { User } from '../types'
import { userAdd } from '../functions/userAdd'

export async function postUserAdd(req: Request, res: Response): Promise<void> {

    let errorCode = 500

    try {
        const { name, email, password }: User = req.body

        if (!name) {
            errorCode = 422
            throw new Error('Nome do usuário faltando')
        }
        if (!email) {
            errorCode = 422
            throw new Error('Email do usuário faltando')
        }
        if (!password) {
            errorCode = 422
            throw new Error('Senha do usuário faltando')
        }
        const usersArray = await connection.raw(`
        SELECT * FROM labecommerce_users
        `)
        const emailExists = usersArray[0].find((user: User) => {
            return user.email === email
        })

        if (emailExists) {
            errorCode = 409
            throw new Error('Email já cadastrado ateriormente')
        } else {
            userAdd(name, email, password)
        }

        res.status(200).send('Usuário criado com sucesso')

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

}

