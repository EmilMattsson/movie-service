import server from '../src/app'

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

export async function getActors() {
  return server.inject(
    {
      method: 'GET',
      url: '/actors',
    }
  )
}

export async function deleteActor() {
  return server.inject(
    {
      method: 'DELETE',
      url: '/actors/0'
    }
  )
}