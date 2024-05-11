import express from 'express'
import * as authController from '../controller/authController'

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/logout', authController.logout)

export default router