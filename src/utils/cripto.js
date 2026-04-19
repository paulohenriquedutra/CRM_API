import bcrypt from "bcrypt"

const salt = 10

async function criptPassword(password){
    const password_hash = await bcrypt.hash(password, salt)
    return password_hash
}

export default criptPassword