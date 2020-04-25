import server from '../src/serverConfig'

export async function createActor(name?: string) {
  return server.inject(
    {
      method: 'POST',
      url: '/actors',
      payload: {
        name: name
      }
    }
  )
}

export async function getActor(id?: number) {
  return server.inject(
    {
      method: 'GET',
      url: `/actors/${id}`
    }
  )
}

export async function getActors() {
  return server.inject(
    {
      method: 'GET',
      url: '/actors',
    }
  )
}

export async function deleteActor(id?: number) {
  return server.inject(
    {
      method: 'DELETE',
      url: `/actors/${id}`
    }
  )
}