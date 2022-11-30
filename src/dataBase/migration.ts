import { connection } from "./connection"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

export const createTables = () => connection
    .raw(`
     
     
   `)
    .then(() => { console.log("Tabelas criadas") })
    .catch(printError)

export const closeConnection = () => { connection.destroy() }

createTables()
    .finally(closeConnection)