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