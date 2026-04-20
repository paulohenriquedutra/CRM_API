import sql from "../database/dataBase.js"
import * as usersService from "../services/usersService.js"

//Add middleware for error handling in the future.
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

export const patchUserById = (async (req,res) =>{
    try{
        const updatedUser = await usersService.patchUserById(req.params,req.body)
        res.status(201).json({message: "Usuario atualizado", data: updatedUser})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
})

export const createUser = (async (req, res) => {
    try{
        const user = await usersService.createUser(req.body.userData)
        res.status(201).json({message: "Usuário adicionado com sucesso", data: user})
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})
export const getAllUsers = (async (req,res) =>{
    try{
        const users = await usersService.getAllUsers()
        res.status(201).json({message: "Usuarios encontrados", data: users})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
    
})
export const getUserById = (async (req, res) =>{
    try{
        const user = await usersService.getUserById(req.params)
        res.status(201).json({message: "Usuario encontrado", data: user})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
})

export const putUserById = (async (req,res) =>{
    try{
        const updatedUser = await usersService.putUserById(req.params,req.body)
        res.status(201).json({message: "Usuario atualizado", data: updatedUser})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message})
    }
})