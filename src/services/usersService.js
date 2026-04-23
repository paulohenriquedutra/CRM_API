import sql from "../database/dataBase.js"
import formatTimeStamp from "../utils/dateFormat.js"
import criptPassword from "../utils/cripto.js"
import AppError from "../utils/errorCatch.js"
import { isValidEmail, normalizeEmail } from "../utils/emailUtils.js"
import { captalizeWords } from "../utils/wordsUtils.js"

//CRUD
export async function createUser({name, email, password}){
    let userData = await processUserInput(name, email, password)
    const [user] = await sql`INSERT INTO users (name, email, password_hash) VALUES (${userData.name}, ${userData.email}, ${userData.password_hash}) RETURNING id,name,email`

    return user
}

export async function getAllUsers() {
    const users = await sql`SELECT id, name, email, created_at FROM USERS`
    users.forEach( u => u.created_at = formatTimeStamp(u.created_at, "pt-br"))

    return users
}

export async function getUserById({id}){
    const [user] = await sql`SELECT id, name, email, created_at FROM USERS WHERE id = ${id}`

    if(user === undefined){
        throw new AppError("user not found", 404)
    }
    user.created_at = formatTimeStamp(user.created_at, "pt-br")

    return user
}

export async function deleteUserById({id}){
    const [result] = await sql `DELETE FROM users WHERE id = ${id} RETURNING id`

    if(!result.length){
        throw new AppError("user not found", 404)
    }
    
    return result
}

export async function putUserById({id},{name, email, password}){
    let userData = await processUserInput(name, email, password)
    let user = await sql `UPDATE users SET name = ${userData.name}, email = ${userData.email}, password_hash = ${userData.password_hash} WHERE id = ${id} RETURNING id, name, email, created_at`
    if(!user.length){
        throw new AppError("user not found", 404)
    }
    
    return user
}

export async function patchUserById({id},{...columns}){

    const allowedcolumns = ["name", "email", "password"]
    let updatedData = {}
    for (const key in columns){
        if (!allowedcolumns.includes(key)) continue
        switch(key){
            case "name":
                updatedData[key] = captalizeWords(columns[key])
                break;
            case "password":
                updatedData.password_hash = await criptPassword(columns[key])
                break;
            case "email":
                let email = normalizeEmail(columns[key])
                let isValid = isValidEmail(email)
                if (!isValid) throw new AppError("Invalid Email", 400)
                updatedData[key] = email
                break;
        }
    }
    
    const user = await sql `UPDATE users SET ${sql(updatedData)} WHERE id = ${id} RETURNING id, name, email, created_at`

    if(!user.length){
        throw new AppError("user not found", 404)
    }
    return user
}

//others
async function processUserInput(name, email, password){
    let nameFormat = captalizeWords(name)
    let emailFormat = normalizeEmail(email)
    let isValid =  isValidEmail(emailFormat)

    if (!nameFormat) throw new AppError("invalid username", 400)
    if (!password) throw new AppError("invalid password", 400)
    if (!isValid) throw new AppError("invalid email", 400)

    let passwordHash = await criptPassword(password)
    
    return {
        name: nameFormat,
        email: emailFormat,
        password_hash: passwordHash,    
    }
}
