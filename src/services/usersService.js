import sql from "../database/dataBase.js"
import {formatTimeStamp} from "../utils/dateFormat.js"
import formatInput from "../utils/formatInput.js"
import criptPassword from "../utils/cripto.js"


export async function deleteUserById({id}){
    const user = await sql `SELECT id FROM users WHERE id = ${id}`
    if(!user.length){
        throw new Error("Usuário não existe")
    }
    const result = await sql `DELETE FROM users WHERE id = ${id}`
    return result
}
export async function getAllUsers() {
    const users = await sql`SELECT id, name, email, created_at FROM USERS`
    users.map( u => u.created_at = formatTimeStamp(u.created_at, "pt-br"))
    return users
}
export async function createUser({name, email, password}){
    let format = formatInput(name, email)
    let password_hash = await criptPassword(password)

    if(format.error === "true"){
        throw new Error(format.message)
    }

    const [user] = await sql`INSERT INTO users (name, email, password_hash) VALUES (${format.name}, ${format.email}, ${password_hash}) RETURNING id,name,email`
    return user
}