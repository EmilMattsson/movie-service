import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { v4 as uuid } from 'uuid';

import { Movie } from '../models';
import { query } from '../db';

export class MovieController {

  static async getMovies(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
		const movies = await query('SELECT * FROM movie').then(result => {
			return result.rows;
		});
    res.send(movies);
  }

  static async getMovie(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    if (!req.params?.id) res.status(400).send('id missing in parameter');

    const movie = await query('SELECT * FROM movie where id = $1', req.params.id).then(result => {
			return result.rows[0];
		});
    if (!movie) res.status(404).send('Movie not found');
    else res.send(movie);
  }

  static async createMovie(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    if (!req.body?.title || !req.body?.year) res.status(400).send('title is required');
    else if (req.body.year < 1) res.status(400).send('Year has to be a positive number');
    else if (req.body.actors.length < 1) res.status(400).send('Atleast 1 actor has to be starred in a movie');
    else {
			// check if actors exist
			console.log(req.body.actors);
			console.log(JSON.stringify(req.body.actors).replace(/[\[\]]/g, '').replace(/[\"]/g, '\''));
			const placeholders = req.body.actors.map(function(name: string, i: number) { 
				return '$'+(i + 1); 
			}).join(',');
			// something is wrong here, very weird that 
			const actors: number = await query(`SELECT COUNT(*) FROM actor where id in(${placeholders})`, req.body.actors)
				.then(result => {
					return result.rowCount;
				})
				.catch(err => {
					throw new Error('first: ' + err);
				});
			console.log(actors);

      const newMovie: Movie = {
        id: uuid(),
        title: req.body.title,
        year: req.body.year,
        actorIds: req.body.actors
      };
			const movieEntity = await query('INSERT INTO movie(id, title, year) VALUES($1, $2, $3)', [newMovie.id, newMovie.title, newMovie.year])
				.then(result => {
					return result.rows[0];
				})
				.catch(err => {
					throw new Error('second: ' + err);
				})
			newMovie.actorIds?.forEach(actorId => {
				query('INSERT INTO actor_in_movie(movie_id, actor_id) VALUES($1, $2)', [newMovie.id, actorId])
			});

      res.send(movieEntity);
    }
  }

  // async deleteMovie(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
  //   if (!req.params?.id) res.status(400).send('id missing in params');

  //   const movie: Movie | undefined = movies.find((movie) => (movie.id = req.params.id));
  //   if (!movie) {
  //     res.status(404).send('Movie not found');
  //   } else {
  //     movies = movies.filter((movie) => movie.id != req.params.id);
  //     res.status(204).send();
  //   }
  // }
}
