import server from '@/server'
import { log } from '@/utils/logger'
import { HOST, PORT } from '@/config'

function kill() {
    server.close()
    process.exit(0)
}

process.on('SIGINT', kill)
process.on('SIGTERM', kill)

server.listen(PORT, () => log.info(`Server running at http://${HOST}:${PORT}`))