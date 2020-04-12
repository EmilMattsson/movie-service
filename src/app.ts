import fastify, {
  FastifyInstance
} from 'fastify'

import { createActor, getActor, deleteActor } from './routes/actorHandlers'
import {
  createActorOptions,
  getActorOptions,
  deleteActorOptions,
} from './routes/actorRouteOptions'
import { MovieController } from './routes/movieController'

const server: FastifyInstance = fastify({ logger: true })
const movieController = new MovieController()

server.post('/actors', createActorOptions, createActor)
server.get('/actors/:id', getActorOptions, getActor)
server.delete('/actors/:id', deleteActorOptions, deleteActor)

server.get('/movies', movieController.getMovies)
server.post('/movies', movieController.createMovie)
server.get('/movies/:id', movieController.getMovie)
server.delete('/movies/:id', movieController.deleteMovie)

export default server