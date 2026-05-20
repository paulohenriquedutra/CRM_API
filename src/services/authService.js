import {checkPassword} from "../utils/cripto.js"
import {findByEmail} from "../repository/usersRepository.js"
import AppError from "../utils/errorCatch.js"
import jwt from "jsonwebtoken"

async function verifyUser({email, password}){
    const [user] = await findByEmail(email)
    if (!user) throw new AppError("email not registered",401)
    const isMatch = await checkPassword(password, await user.password_hash)
    if (!isMatch) throw new AppError("credentials do not match",401)

    const token = jwt.sign({id:user.id,email:user.email, email:user.email, role:user.role},process.env.JWT_SECRET_KEY,{
        expiresIn: "3m" //modify time in future
    })
    console.log(token) //only development
    return token
}

export default verifyUser