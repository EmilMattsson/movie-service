import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: FastifyInstance = fastify({ logger: true })

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
}

server.get(
  '/ping',
  opts,
  async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
    return { pong: 'it worked!' }
  }
)

server.listen(3000, err => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
