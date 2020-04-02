import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import { createActor, getActor, deleteActor } from './routes/actorHandlers'
import {
  createActorOptions,
  getActorOptions,
  deleteActorOptions,
} from './routes/actorRouteOptions'
import { ServerResponse } from 'http'

const server: FastifyInstance = fastify({ logger: true })

server.get(
  '/',
  (request: FastifyRequest, response: FastifyReply<ServerResponse>) => {
    response.send('hello there')
  }
)
server.post('/actors', createActorOptions, createActor)
server.get('/actors/:id', getActorOptions, getActor)
server.delete('/actors/:id', deleteActorOptions, deleteActor)

export default server
