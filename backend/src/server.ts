import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import pino from './utils/logger'
import * as router from './router'

const app = express();

app.use(pino)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.send('hello');
})

app.use('/auth', router.authRouter)
app.use('/posts', router.postRouter)
app.use('/messages', router.messageRouter)

export default createServer(app)
