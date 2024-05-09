import pinoHttp from 'pino-http'

const pino = process.env.NODE_ENV === 'production'
  ? pinoHttp()
  : pinoHttp({ transport: { target: 'pino-pretty' } });

export const { logger: log } = pino
export default pino