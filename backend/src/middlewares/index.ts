import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { log } from '@/utils/logger'

export function auth(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization
        if (!token) {
            log.warn('No token provided from ', req.ip)
            res.status(401).json({ message: 'failed', error: 'No token provided' })
            return
        }
        token = token.split(' ')[1]
        if (!token) {
            log.warn('No token provided from ', req.ip)
            res.status(401).json({ message: 'failed', error: 'No token provided' })
            return
        }
        jwt.verify(token, SECRET)
        next()
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.setHeader('authorization', '')
            res.status(401).json({ message: 'session expired', error: err.toString() })
            return
        }
        log.error('Failed to authenticate ', req.ip, ' : ', err)
        res.status(500).json({ message: 'failed', error: err })
    }
}
