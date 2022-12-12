import { connection } from '../dataBase/connection'

export async function withoutOrderAndSearch() {
    try {
        const result = await connection.raw(`
            SELECT * FROM labecommerce_products
        `)

        return result[0]
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function withOrderAndWthoutSearch(order: string) {
    try {
        const result = await connection.raw(`
        SELECT * FROM labecommerce_products
        ORDER BY name ${order};
        `)

        return result[0]
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function withSearchAndWthoutOrder(search: string) {
    try {
        const result = await connection.raw(`
        SELECT * FROM labecommerce_products
        WHERE name LIKE "%${search}%"
        `)
        return result[0]
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function withSearchAndWthOrder(search: string, order: string) {
    try {
        const result = await connection.raw(`
        SELECT * FROM labecommerce_products
        WHERE name LIKE "%${search}%"
        ORDER BY name ${order}
        `)
        return result[0]
    } catch (error: any) {
        throw new Error(error.message);
    }
}
