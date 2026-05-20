import bcrypt from "bcrypt"

const salt = 10

export async function hashPassword(password){
    const password_hash = await bcrypt.hash(password, salt)
    return password_hash
}
export async function checkPassword(password, password_hash){
    const match = await bcrypt.compare(password, password_hash)
    return match
}