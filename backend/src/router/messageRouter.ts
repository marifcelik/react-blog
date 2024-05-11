import express from 'express'
import * as messageController from '@/controller/messageController'
import * as middlewares from '@/middlewares'

const router = express.Router()

router.post('/', messageController.createMessage)
router.get('/', middlewares.auth, messageController.getMessages)
router.get('/:id', middlewares.auth, messageController.getMessage)
router.delete('/:id', middlewares.auth, messageController.deleteMessage)

export default router
