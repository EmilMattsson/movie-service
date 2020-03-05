import { FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

import { Actor } from '../models'

let counter: number = 0
let actors: Actor[] = []

export const createActor = async (
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>
) => {
  const newActor: Actor = {
    id: counter++,
    name: request.body.name,
  }
  actors.push(newActor)
  reply.status(201).send(newActor)
}

export const getActor = async (
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>
) => {
  const actorId = request.params.id
  const actor = actors.find((a: Actor) => a.id == actorId)
  reply.status(200).send(actor)
}

export const deleteActor = async (
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>
) => {
  const actorId = request.params.id
  actors.filter((actor: Actor) => actor.id != actorId)
  reply.status(200).send(actors)
}
