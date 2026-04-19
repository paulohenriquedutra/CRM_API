import sql from "../database/dataBase.js"
import * as usersService from "../services/usersService.js"

//to improve error handling in the future
//CRUD
export const deleteUserById = (async (req, res) =>{
    try{
        const result = await usersService.deleteUserById(req.params)
        res.status(200).json({message: "usuario deletado"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

export const patchUserById = ""

export const createUser = (async (req, res) => {
    try{
        const user = await usersService.createUser(req.body.userData)
        res.status(201).json({message: "Usuário adicionado com sucesso", data: user})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Erro no servidor, tente novamente, se persistir contate o suporte"})
    }
})
export const getAllUsers = (async (req,res) =>{
    try{
        const users = await usersService.getAllUsers()
        res.status(201).json({message: "Usuarios encontrados", data: users})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Erro no servidor, tente novamente, se persistir contate o suporte"})
    }
    
})
export const putUserById = ""
export const getUserById = ""