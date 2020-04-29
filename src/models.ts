export interface Actor {
	id: string
	name: string
}

export interface Movie {
	id: string
	title: string
	year: number
	actorIds?: string[]
}
