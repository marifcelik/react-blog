import 'dotenv-expand/config'

export const
    HOST = process.env.HOST ?? 'localhost',
    PORT = parseInt(process.env.PORT!) || 3000,
    DB = process.env.DB ?? 'blog',
    DB_HOST = process.env.DB_HOST ?? 'localhost',
    DB_PORT = parseInt(process.env.DB_PORT!) || 5432,
    DB_USER = process.env.DB_USER ?? 'postgres',
    DB_PASS = process.env.DB_PASS ?? 'postgres',
    DB_URL = process.env.DB_CONN_STR ?? `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB}`,
    SECRET = process.env.SECRET ?? 'do not use secret like this'
