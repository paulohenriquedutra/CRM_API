import formatTimeStamp from "../utils/dateFormat.js"
import {criptPassword} from "../utils/cripto.js"
import AppError from "../utils/errorCatch.js"
import {create, findAll, findById, deleteById, patchUpdate, updateAllProperty, findEmail} from "../repository/usersRepository.js"
import { isValidEmail, normalizeEmail } from "../utils/emailUtils.js"
import { captalizeWords } from "../utils/wordsUtils.js"

//CRUD
export async function createUser({name, email, password}){
    let userData = await processUserInput(name, email, password)
    const [user] = await create(userData.name, userData.email, userData.password_hash)

    return user
}

export async function getAllUsers() {
    const users = await findAll()
    users.forEach( u => u.created_at = formatTimeStamp(u.created_at, "pt-br"))

    return users
}

export async function getUserById({id}){
    const [user] = await findById(id)

    if(user === undefined){
        throw new AppError("user not found", 404)
    }
    user.created_at = formatTimeStamp(user.created_at, "pt-br")

    return user
}

export async function deleteUserById({id}){
    const result = await deleteById(id)

    if(result.length === 0){
        throw new AppError("user not found", 404)
    }
    
    return result
}

export async function putUserById({id},{name, email, password}){
    let userData = await processUserInput(name, email, password)
    let user = await updateAllProperty(id, userData.name, userData.email, userData.password_hash)
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
    
    const user = await patchUpdate(id, updatedData)

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
    let isNew = await isRegisterEmail(email)

    if (!nameFormat) throw new AppError("invalid username", 400)
    if (!password) throw new AppError("invalid password", 400)
    if (!isValid) throw new AppError("invalid email", 400)
    if (!isNew) throw new AppError("email already registered", 409)

    let passwordHash = await criptPassword(password)
    
    return {
        name: nameFormat,
        email: emailFormat,
        password_hash: passwordHash,    
    }
}
async function isRegisterEmail(email){
    const [user] = await findEmail(email)
    return (user === undefined) ? true : false
}