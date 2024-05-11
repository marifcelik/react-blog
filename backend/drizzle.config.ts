import 'dotenv-expand/config'
import type { Config } from 'drizzle-kit'
import { DB_HOST } from '@/config'

export default {
    schema: 'db/schema.ts',
    out: 'db/drizzle',
    driver: 'pg',
    dbCredentials: { connectionString: DB_HOST }
} satisfies Config
