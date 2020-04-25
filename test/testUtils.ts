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

export async function getMovie(id?:number) {
  return server.inject(
    {
      method: 'GET',
      url: `/movies/${id}`
    }
  )
}

export async function createMovie(title?: string, year?: number, actorIds?: string[]) {
  const newMovie = {
    title: title,
    year: year,
    actors: actorIds
  }
  return server.inject(
    {
      method: 'POST',
      url: '/movies',
      payload: newMovie
    }
  )
}

export async function deleteMovie(id?: number) {
  return server.inject(
    {
      method: 'DELETE',
      url: `/movies/${id}`
    }
  )
}