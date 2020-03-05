import { RouteShorthandOptions, RouteSchema } from 'fastify'

const postActorSchema: RouteSchema = {
  body: {
    name: 'string',
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
    },
  },
}

export const createActorOptions: RouteShorthandOptions = {
  schema: postActorSchema,
}

export const getActorOptions: RouteShorthandOptions = {
  schema: {
    params: {
      id: {
        type: 'string',
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
    },
  },
}

export const deleteActorOptions: RouteShorthandOptions = {
  schema: {
    params: {
      id: {
        type: 'string',
      },
    },
    response: {
      204: {
        type: 'object',
      },
    },
  },
}
