import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

import { Actor } from '../models'

let counter: number = 0
let actors: Actor[] = []

export const createActor = async (
  request: FastifyRequest,
  response: FastifyReply<ServerResponse>
) => {
  const newActor: Actor = {
    id: counter++,
    name: request.body.name,
  }
  actors.push(newActor)
  response.status(201).send(newActor)
}

export const getActor = async (
  request: FastifyRequest,
  response: FastifyReply<ServerResponse>
) => {
  const actorId = request.params.id
  const actor = actors.find((a: Actor) => a.id == actorId)
  response.status(200).send(actor)
}

export const getActors = async (request: FastifyRequest, response: FastifyReply<ServerResponse>) => {
  response.status(200).send(actors)
}

export const deleteActor = async (
  request: FastifyRequest,
  response: FastifyReply<ServerResponse>
) => {
  const actorId = request.params.id
  actors = actors.filter((actor: Actor) => actor.id != actorId)
  response.status(204).send(actors)
}
