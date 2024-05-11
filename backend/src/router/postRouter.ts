import express from 'express'
import * as postController from '../controller/postController'
import * as middlewares from '@/middlewares'

const router = express.Router()

router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)

router.use(middlewares.auth)

router.post('/', postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

export default router