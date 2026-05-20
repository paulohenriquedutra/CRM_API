import express from "express"
import usersRout from "./routes/usersRoute.js"
import errorHandling from "./middlewares/errorMiddleware.js"
import authRout from "./routes/authRoute.js"
import verifyToken from "./middlewares/tokenMiddleware.js"


const app = express()
app.use(express.json())

//Endpoints
app.use("/users",verifyToken, usersRout)
app.use("/auth", authRout)

//middlewares
app.use(errorHandling)

export default app