import sql from "../database/dataBase.js"
import formatTimeStamp from "../utils/dateFormat.js"
import {captalizeWords, formatEmail, formatInput} from "../utils/formatInput.js"
import criptPassword from "../utils/cripto.js"

export async function createUser({name, email, password}){
    let format = formatInput(name, email)
    let password_hash = await criptPassword(password)

    if(format.error === "true"){
        throw new Error(format.message)
    }

    const [user] = await sql`INSERT INTO users (name, email, password_hash) VALUES (${format.name}, ${format.email}, ${password_hash}) RETURNING id,name,email`
    return user
}

export async function getAllUsers() {
    const users = await sql`SELECT id, name, email, created_at FROM USERS`
    users.map( u => u.created_at = formatTimeStamp(u.created_at, "pt-br"))
    return users
}

export async function getUserById({id}){
    let user = await sql `SELECT id FROM users WHERE id = ${id}`

    if(!user.length){
        throw new Error("Usuário não existe")
    }

    [user] = await sql`SELECT id, name, email, created_at FROM USERS WHERE id = ${id}`
    user.created_at = formatTimeStamp(user.created_at, "pt-br")
    return user
}

export async function deleteUserById({id}){
    const user = await sql `SELECT id FROM users WHERE id = ${id}`
    if(!user.length){
        throw new Error("Usuário não existe")
    }
    const result = await sql `DELETE FROM users WHERE id = ${id}`
    return result
}

export async function putUserById({id},{name, email, password}){
    let format = formatInput(name, email)
    let password_hash = await criptPassword(password)
    let user = await sql `SELECT id FROM users WHERE id = ${id}`
    if(!user.length){
        throw new Error("Usuário não existe")
    }
    user = await sql `UPDATE users SET name = ${name}, email = ${email}, password_hash = ${password_hash} WHERE id = ${id} RETURNING id, name, email, created_at`
    return user
}

export async function patchUserById({id},{...colluns}){
    let user = await sql `SELECT id FROM users WHERE id = ${id}`
    if(!user.length){
        throw new Error("Usuário não existe")
    }

    const allowedColluns = ["name", "email", "password", "role"]
    let updatedData = {}
    for (const key of allowedColluns){
        if (colluns[key] !== undefined){
            switch(key){
                case "name":
                    updatedData[key] = captalizeWords(colluns[key])
                    break;
                case "password":
                    console.log("PASSSOU AQUIII")
                    updatedData.password_hash = await criptPassword(colluns[key])
                    delete updatedData.password
                    break;
                case "email":
                    updatedData[key] = formatEmail(colluns[key])
                    break;
                case "role":
                    updatedData[key] = captalizeWords(colluns[role])
                    updatedData[key] = colluns[key]
                    break;
            updatedData[key] = colluns[key]
            }
        }
    }
    console.log(updatedData)
    user = await sql `UPDATE users SET ${sql(updatedData)} WHERE id = ${id} RETURNING id, name, email, created_at`
    return user
}