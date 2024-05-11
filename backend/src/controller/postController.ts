import { Request, Response } from "express"
import { asc, eq, desc } from 'drizzle-orm'
import { NewPost, Post, posts, users } from '#/schema'
import { db } from '#/db'
import { log } from "@/utils/logger"

export async function getPosts(_req: Request, res: Response) {
    const result = await db.select().from(posts).orderBy(desc(posts.createdAt))
    log.info('posts fetched\n%j', result)
    return res.status(200).send(result)
}

export async function getPost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send("Missing id")
    }

    const result = await db.select({
        title: posts.title,
        content: posts.content,
        author: users.username,
        updatedAt: posts.updatedAt
    })
        .from(posts)
        .leftJoin(users, eq(posts.authorId, users.id))
        .where(eq(posts.id, id))
        .limit(1);

    log.info('post fetched\n%j', result)
    return res.status(200).json(result[0])
}

export async function createPost(req: Request, res: Response) {
    const post: NewPost = req.body
    if (!post) {
        return res.status(400).send("Missing post")
    }

    post.authorId = parseInt(req.headers['x-user-id'] as string)
    const result = await db.insert(posts).values(post).returning()
    log.info('post created\n%j', result)
    return res.status(201).send("Post created")
}

export async function updatePost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        log.warn('Missing id %s', req.params.id)
        return res.status(400).send("Missing id")
    }

    const post: Post = req.body
    if (!post) {
        return res.status(400).send("Missing post")
    }

    const result = await db.update(posts)
        .set({ title: post.title, content: post.content, updatedAt: new Date() })
        .where(eq(posts.id, id))
        .returning()
    log.info('post updated\n%j', result)
    return res.status(200).send("Post updated")
}

export async function deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (!id) {
        log.warn('Missing id %s', req.params.id)
        return res.status(400).send("Missing id")
    }

    const result = await db.delete(posts).where(eq(posts.id, id)).returning()
    log.info('post deleted\n%j', result)
    return res.status(200).send("Post deleted")
}