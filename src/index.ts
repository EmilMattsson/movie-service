import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteShorthandOptions,
} from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

import { createActor, getActor, deleteActor } from './routes/actorHandlers'
import {
  createActorOptions,
  getActorOptions,
  deleteActorOptions,
} from './routes/actorRouteOptions'

const server: FastifyInstance = fastify({ logger: true })

const opts: RouteShorthandOptions = {
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

server.post('/actors', createActorOptions, createActor)
server.get('/actors/:id', getActorOptions, getActor)
server.delete('/actors/:id', deleteActorOptions, deleteActor)

server.listen(3000, err => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
