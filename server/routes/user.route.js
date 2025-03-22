import express from 'express'
import { getOtherUsers, getProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import {  isAuthenticated } from '../middlewares/auth.middleware.js'

const router = express.Router()

 router.route("/register").post(upload.single("avatar"),register)
 router.route("/login").post(login)
 router.route("/logout").post(isAuthenticated,logout)
 router.route("/get-profile").get(isAuthenticated,getProfile)
 router.route("/get-otherusers").get(isAuthenticated,getOtherUsers)
 router.route("/update/:id").put(isAuthenticated, upload.single("avatar"), updateProfile);


export default router