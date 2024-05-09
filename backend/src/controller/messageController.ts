import { Request, Response } from "express"
import { eq } from 'drizzle-orm'
import { NewMessage, messages } from '#/schema'
import { db } from '#/db'
import { log } from "@/utils/logger"

export async function getMessages(_req: Request, res: Response) {
    const result = await db.select().from(messages)
    log.info('messages fetched\n%j', result)
    return res.status(200).send(result)
}

export async function getMessage(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send("Missing id")
    }

    const result = await db.select().from(messages).where(eq(messages.id, id))
    log.info('message fetched\n%j', result)
    return res.status(200).send(result)
}

export async function createMessage(req: Request, res: Response) {
    const message: NewMessage = req.body
    if (!message) {
        return res.status(400).send("Missing message")
    }

    const result = await db.insert(messages).values(message).returning()
    log.info('message created\n%j', result)
    return res.status(201).send("Message created")
}

export async function deleteMessage(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send("Missing id")
    }

    const result = await db.delete(messages).where(eq(messages.id, id)).returning()
    log.info('message deleted\n%j', result)
    return res.status(200).send("Message deleted")
}
