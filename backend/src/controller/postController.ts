import { Request, Response } from "express"
import { eq } from 'drizzle-orm'
import { NewPost, posts } from '#/schema'
import { db } from '#/db'
import { log } from "@/utils/logger"

export async function getPosts(_req: Request, res: Response) {
    const result = await db.select().from(posts)
    log.info('posts fetched\n%j', result)
    return res.status(200).send(result)
}

export async function getPost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send("Missing id")
    }

    const result = await db.select().from(posts).where(eq(posts.id, id))
    log.info('post fetched\n%j', result)
    return res.status(200).send(result)
}

export async function createPost(req: Request, res: Response) {
    const post: NewPost = req.body
    if (!post) {
        return res.status(400).send("Missing post")
    }

    const result = await db.insert(posts).values(post).returning()
    log.info('post created\n%j', result)
    return res.status(201).send("Post created")
}

export async function updatePost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send("Missing id")
    }

    const post: NewPost = req.body
    if (!post) {
        return res.status(400).send("Missing post")
    }

    const result = await db.update(posts).set(post).where(eq(posts.id, id)).returning()
    log.info('post updated\n%j', result)
    return res.status(200).send("Post updated")
}

export async function deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send("Missing id")
    }

    const result = await db.delete(posts).where(eq(posts.id, id)).returning()
    log.info('post deleted\n%j', result)
    return res.status(200).send("Post deleted")
}