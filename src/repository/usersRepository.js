import sql from "../database/dataBase.js" 

export async function create(name, email, password_hash){
    return await sql`INSERT INTO users (name, email, password_hash) VALUES (${name}, ${email}, ${password_hash}) RETURNING id,name,email`
} 
export async function findAll(){
    return await sql`SELECT id, name, email, created_at FROM USERS`
}
export async function findById(id){
    return await sql`SELECT id, name, email, created_at FROM USERS WHERE id = ${id}`
}
export async function deleteById(id){
    return await sql `DELETE FROM users WHERE id = ${id} RETURNING id`
}
export async function updateAllProperty(id, name, email, password_hash){
    return await sql `UPDATE users SET name = ${name}, email = ${email}, password_hash = ${password_hash} WHERE id = ${id} RETURNING id, name, email, created_at`
}
export async function patchUpdate(id, data){
    return await sql `UPDATE users SET ${sql(data)} WHERE id = ${id} RETURNING id, name, email, created_at`
}
export async function findEmail(email){
    return await sql `SELECT email FROM users WHERE email = ${email}`
}
export async function findByEmail(email){
    return await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email}`
}