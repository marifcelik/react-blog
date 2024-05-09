import { Request, Response } from "express"
import { eq } from 'drizzle-orm'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { NewUser, users } from '#/schema'
import { db } from '#/db'
import { SECRET } from '@/config'
import { log } from "@/utils/logger"

export async function login(req: Request, res: Response) {
    const { username, password }: NewUser = req.body
    if (!username || !password) {
        return res.status(400).send("Missing username or password")
    }

    try {
        const user = await db.select().from(users).where(eq(users.username, username))
        if (user.length === 0) {
            return res.status(404).send("User not found")
        }

        const match = await bcrypt.compare(password, user[0].password)
        if (!match) {
            return res.status(401).send("Invalid password")
        }

        const token = jwt.sign({ id: user[0].id }, SECRET)
        req.headers.authorization = `Bearer ${token}`
        return res.status(200).send({ token })
    } catch (err) {
        log.error(err)
        return res.status(500).send("Error while fetching user : " + err)
    }
}

export async function register(req: Request, res: Response) {
    const { username, password }: NewUser = req.body
    if (!username || !password) {
        return res.status(400).send("Missing username or password")
    }

    try {
        const user = await db.select().from(users).where(eq(users.username, username))
        if (user.length > 0) {
            return res.status(409).send("User already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const result = await db.insert(users).values({ username, password: hash }).returning()
        log.info('user created\n%j', result)
        return res.status(201).send("User created : ")
    } catch (err) {
        log.error(err)
        return res.status(500).send("Error while creating user : " + err)
    }
}

export async function logout(req: Request, res: Response) {
    req.headers.authorization = ""
    return res.status(200).send("Logout successful")
}
