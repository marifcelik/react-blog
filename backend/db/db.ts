import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { DB_URL } from '../src/config'

export const conn = postgres(DB_URL)
export const db = drizzle(conn, { schema })
