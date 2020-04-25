import { getMovie, createMovie, deleteMovie } from './testUtils'

describe('some random test', () => {
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

	// test create a movie with valid title, year, and actors

	test('delete a movie that does not exist, then 404 should be returned', async () => {
		const res = await deleteMovie(0)

		expect(res.statusCode).toBe(404)
	})
})
