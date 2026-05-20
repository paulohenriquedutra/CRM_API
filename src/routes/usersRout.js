import { Router } from "express";
import { deleteUserById, patchUserById, createUser, getAllUsers, putUserById, getUserById } from "../controllers/usersController.js"
import verifyToken from "../middlewares/tokenMiddleware.js";

const router = Router()

router.route("/")
   .get(verifyToken, getAllUsers) 
   .post(verifyToken, createUser)
router.route("/:id")
   .get(verifyToken, getUserById)
   .put(verifyToken, putUserById)
   .patch(verifyToken, patchUserById)
   .delete(verifyToken, deleteUserById)

export default router