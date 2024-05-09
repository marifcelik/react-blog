import 'dotenv-expand/config'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db, conn } from './db'
import { log } from '@/utils/logger'

async function doMigrate() {
    try {
        await migrate(db, { migrationsFolder: 'db/drizzle' })
        await conn.end()
        log.info('Migration done')
    } catch (e) {
        log.error(e)
    }
}

doMigrate()