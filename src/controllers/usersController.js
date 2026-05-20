import * as usersService from "../services/usersService.js"

//Add middleware for error handling in the future.
//CRUD
export const deleteUserById = (async (req, res, next) =>{
    try{
        const result = await usersService.deleteUserById(req.params)
        res.status(200).json({message: "the user has been deleted"})
    }catch(err){
        next(err)
    }
})

export const patchUserById = (async (req,res, next) =>{
    try{
        const updatedUser = await usersService.patchUserById(req.params,req.body)
        res.status(200).json({message: "the user has been updated", data: updatedUser})
    }catch(err){
        next(err)
    }
})

export const createUser = (async (req, res, next) => {
    try{
        const user = await usersService.createUser(req.body)
        res.status(201).json({message: "User added successfully", data: user})
    }catch(err){
        next(err)
    }
})
export const getAllUsers = (async (req,res, next) =>{
    try{
        const users = await usersService.getAllUsers()
        res.status(200).json({message: "found users", data: users})
    }catch(err){
        next(err)
    }
    
})
export const getUserById = (async (req, res, next) =>{
    try{
        const user = await usersService.getUserById(req.params)
        res.status(200).json({message: "found users", data: user})
    }catch(err){
        next(err)
    }
})

export const putUserById = (async (req,res, next) =>{
    try{
        const updatedUser = await usersService.putUserById(req.params,req.body)
        res.status(200).json({message: "the user has been updated", data: updatedUser})
    }catch(err){
        next(err)
    }
})