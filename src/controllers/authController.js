import errorHandling from "../middlewares/errorMiddleware.js"
import verifyUser from "../services/authService.js"

export const authUser = (async (req, res, next) =>{
    try{
        const result = await verifyUser(req.body)
        res.status(200).json({message: "token generated", token: result})
    }catch(err){
        next(err)
    }
})

export default authUser