export interface Actor {
	id: string
	name: string
}

export interface Movie {
	id: number
	title: string
	year: number
	actors?: Actor[]
}
