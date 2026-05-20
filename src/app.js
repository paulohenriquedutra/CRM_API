import express from "express"
import usersRout from "./routes/usersRout.js"
import errorHandling from "./middlewares/errorMiddleware.js"
import authRout from "./routes/authRout.js"
import verifyToken from "./middlewares/tokenMiddleware.js"


const app = express()
app.use(express.json())

//Endpoints
app.use("/users", usersRout)
app.use("/auth", authRout)

//middlewares
app.use(errorHandling)
app.use(verifyToken)

export default app