import jwt from "jsonwebtoken"
import AppError from "../utils/errorCatch.js"


function verifyToken(req, res, next){
    try{
        const authHeader = req.headers.authorization
        if (!authHeader) throw new AppError("token not provided", 401)
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    }catch(err){
        next(new AppError("invalid Token", 401))
    }
}
export default verifyToken