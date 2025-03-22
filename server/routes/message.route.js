import express from 'express'
import {  isAuthenticated } from '../middlewares/auth.middleware.js'
import { getMessage, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

 router.route("/send/:receiverId").post(isAuthenticated,sendMessage)
 router.route("/get-messages/:otherParticipentId").get(isAuthenticated,getMessage)


export default router