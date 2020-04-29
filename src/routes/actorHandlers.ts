import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { v4 as uuid } from 'uuid';

import { Actor } from '../models';
import { query } from '../db';

export class ActorController {

  static async createActor(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    if (!req.body?.name) {
      res.status(400).send('name is required');
    } else {
      const newActor: Actor = {
        id: uuid(),
        name: req.body.name
      };
      const actorEntity = await query('INSERT INTO actor(id, name) VALUES($1, $2) RETURNING *', [
        newActor.id,
        newActor.name
      ])
        .then((result) => {
          return result.rows[0];
        })
        .catch((err) => {
          throw new Error(err);
        });

      res.status(201).send(actorEntity);
    }
  }

  static async getActor(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    const actorId = req.params.id;
    const actor: object | undefined = await query('SELECT * FROM actor WHERE id = $1', [actorId]).then((result) => {
      return result.rows[0];
    });
    if (!actor) {
      res.status(404).send('Actor not found');
    } else {
      res.status(200).send(actor);
    }
  }

  static async getActors(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    const actors = await query('SELECT * FROM actor').then((result) => {
      return result.rows;
    });
    res.status(200).send(actors);
  }

  static async deleteActor(request: FastifyRequest, response: FastifyReply<ServerResponse>) {
    const actorId = request.params.id;
    const actor: object | undefined = await query('SELECT * FROM actor WHERE id = $1', [actorId]).then((result) => {
      return result.rows[0];
    });
    if (!actor) {
      response.status(404).send('Actor not found');
    } else {
      query('DELETE FROM actor WHERE id = $1', [actorId]);
      response.status(204).send();
    }
  }
}
