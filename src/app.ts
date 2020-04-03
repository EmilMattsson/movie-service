import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteShorthandOptions,
} from 'fastify'
import { ServerResponse } from 'http'

import { createActor, getActor, deleteActor } from './routes/actorHandlers'
import {
  createActorOptions,
  getActorOptions,
  deleteActorOptions,
} from './routes/actorRouteOptions'
import { MovieController } from './routes/movieController'

const server: FastifyInstance = fastify({ logger: true })
const movieController = new MovieController()

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

server.get('/movies', movieController.getMovies)

export default server