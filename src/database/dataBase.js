import postgres from "postgres"

// connect dataBase
const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString, {ssl:"require"})


export default sql