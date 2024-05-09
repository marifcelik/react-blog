import express from 'express'
import * as messageController from '../controller/messageController'
import * as middlewares from '@/middlewares'

const authRouter = express.Router()

authRouter.post('/', messageController.createMessage)
authRouter.get('/', middlewares.auth, messageController.getMessages)
authRouter.get('/:id', middlewares.auth, messageController.getMessage)
authRouter.delete('/:id', middlewares.auth, messageController.deleteMessage)

export default authRouter
