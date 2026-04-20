import { Router } from "express";
import { deleteUserById, patchUserById, createUser, getAllUsers, putUserById, getUserById } from "../controllers/usersController.js"

const router = Router()

router.route("/")
   .get(getAllUsers) 
   .post(createUser)
router.route("/:id")
   .get(getUserById)
   .put(putUserById)
   .patch(patchUserById)
   .delete(deleteUserById)

export default router