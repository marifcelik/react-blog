import express from 'express'
import * as authController from '../controller/authController'

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.post('/logout', authController.logout)

export default authRouter