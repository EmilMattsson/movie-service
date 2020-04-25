import { getMovie, createMovie, deleteMovie, createActor } from './testUtils'
import { Actor, Movie } from '../src/models'

describe('testing movie routes', () => {

	test('get a movie that does not exist, then 404 should be returned', async () => {
		const res = await getMovie(0)

		expect(res.statusCode).toBe(404)
		expect(res.payload).toBe('Movie not found')
	})

	test('create a movie but title is undefined, then 400 should be returned', async () => {
		const res = await createMovie(undefined, 1, [])

		expect(res.statusCode).toBe(400)
	})

	test('create a movie but year is undefined, then 400 should be returned', async () => {
		const res = await createMovie('Wolf of Wallstreet', undefined, [])

		expect(res.statusCode).toBe(400)
	})

	test('create a movie but year is a negative number, then 400 should be returned', async () => {
		const res = await createMovie('Wolf of Wallstreet', -1, [])

		expect(res.statusCode).toBe(400)
	})

	test('create a movie with no actors, then 400 should be returned', async () => {
		const res = await createMovie('Wolf of Wallstreet', 2011, [])

		expect(res.statusCode).toBe(400)
	})

	test('delete a movie that does not exist, then 404 should be returned', async () => {
		const res = await deleteMovie(0)

		expect(res.statusCode).toBe(404)
	})

	test('create a movie with valid data should return 200', async () => {
		const bale: Actor = JSON.parse((await createActor('Christian Bale')).payload)
		const pitt: Actor = JSON.parse((await createActor('Brad Pitt')).payload)

		const res = await createMovie('Wolf on Wallstreet', 2011, [bale.id, pitt.id])

		const createdMovie: Movie = JSON.parse(res.payload)
		expect(res.statusCode).toBe(200)
		expect(createdMovie.title).toBe('Wolf on Wallstreet')
		expect(createdMovie.year).toBe(2011)
		expect(createdMovie.actors.length).toBe(2)
	})

	test('create a movie and then delete it should return 204 when deleting it', async () => {
		const leo: Actor = JSON.parse((await createActor('Leonardo Di Caprio')).payload)
		const movie: Movie = JSON.parse(((await createMovie('Wolf on Wallstreet', 2011, [leo.id])).payload))

		const res = await deleteMovie(movie.id)
		expect(res.statusCode).toBe(204)

		// try to get the deleted movie after deleting it
		const res2 = await getMovie(movie.id)
		expect(res2.statusCode).toBe(404)
	})
})
