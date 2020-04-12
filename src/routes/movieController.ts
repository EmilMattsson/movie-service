import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

import { Movie } from '../models'

let movies: Movie[] = []
let counter: number = 0

export class MovieController {

  getMovies(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    res.send(movies)
  }

  getMovie(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    if (!req.params?.id) res.status(400).send('id missing in parameter')

    const movie = movies.find(m => m.id == req.params.id)
    res.send(movie)
  }

  createMovie(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    if (!req.body?.title || !req.body?.year) res.status(400).send('data missing')

    const newMovie: Movie = {
      id: counter++,
      title: req.body.title,
      year: req.body.year,
      actors: req.body?.actors
    }
    movies.push(newMovie)
    
    res.send(newMovie)
  }

  deleteMovie(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    if (!req.params?.id) res.status(400).send('id missing in params')

    movies = movies.filter(movie => movie.id != req.params.id)

    res.status(204).send()
  }
}