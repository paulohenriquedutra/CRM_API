import express from "express"
import usersRout from "./routes/usersRout.js"


const app = express()
app.use(express.json())

//Endpoints
app.use("/users", usersRout)



export default app