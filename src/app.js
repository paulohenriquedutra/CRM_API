import express from "express"
import usersRout from "./routes/usersRout.js"
import errorHandling from "./middlewares/errorMiddleware.js"


const app = express()
app.use(express.json())

//Endpoints
app.use("/users", usersRout)

//middlewares
app.use(errorHandling)

export default app