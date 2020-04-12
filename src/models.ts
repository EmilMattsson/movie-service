export interface Actor {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  year: number
  actors?: Actor[]
}
