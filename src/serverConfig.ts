import fastify, { FastifyInstance } from 'fastify';

import { ActorController } from './routes/actorHandlers';
import { createActorOptions, getActorOptions, deleteActorOptions } from './routes/actorRouteOptions';
import { MovieController } from './routes/movieController';

const server: FastifyInstance = fastify({ logger: true });

server.get('/actors', ActorController.getActors);
server.post('/actors', createActorOptions, ActorController.createActor);
server.get('/actors/:id', getActorOptions, ActorController.getActor);
server.delete('/actors/:id', deleteActorOptions, ActorController.deleteActor);

server.get('/movies', MovieController.getMovies);
server.post('/movies', MovieController.createMovie);
server.get('/movies/:id', MovieController.getMovie);
// server.delete('/movies/:id', movieController.deleteMovie);

export default server;
