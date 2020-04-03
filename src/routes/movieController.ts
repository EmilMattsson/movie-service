import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

export class MovieController {

  getMovies(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    res.send('hello there!')
  }
}