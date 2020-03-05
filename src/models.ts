export interface Actor {
  id: number
  name: string
}

export interface Movie {
  title: string
  year: number
  actors: Actor[]
}
