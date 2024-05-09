import express from 'express'
import * as postController from '../controller/postController'
import * as middlewares from '@/middlewares'

const postRouter = express.Router()
postRouter.use(middlewares.auth)

postRouter.get('/', postController.getPosts)
postRouter.get('/:id', postController.getPost)
postRouter.post('/', postController.createPost)
postRouter.put('/:id', postController.updatePost)
postRouter.delete('/:id', postController.deletePost)

export default postRouter