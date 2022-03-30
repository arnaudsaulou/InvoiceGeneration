import { server } from './lib/fastify'

server.listen(process.env.PORT ?? 3000).catch(console.error)