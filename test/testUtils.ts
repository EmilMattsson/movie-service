import server from '../src/app'

export async function createActor() {
  return server.inject(
    {
      method: 'POST',
      url: '/actors',
      payload: {
        name: 'Brad Pitt'
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