import server from '../src/app'
import { isObject, isString } from 'util'

describe('testing actor routes', () => {
  
  test('get all actors when none have been created, then an empty array is returned', async () => {
    const res = await server.inject(
      {
        method: 'GET',
        url: '/movies',
      }
    )
    expect(res.statusCode).toBe(200)
    expect(res.payload).toBe(JSON.stringify([]))
  })
  
  test('create an Actor named "Brad Pitt", then delete him', async () => {
    const result = await server.inject(
      {
        method: 'POST',
        url: '/actors',
        payload: {
          name: 'Brad Pitt'
        }
      }
    )
    expect(result.statusCode).toBe(201)
    expect(isString(result.payload)).toBe(true)
    expect(isObject(JSON.parse(result.payload))).toBe(true)
    expect(JSON.parse(result.payload).name).toBe('Brad Pitt')

    const res = await server.inject(
      {
        method: 'DELETE',
        url: '/actors/0'
      }
    )
    expect(res.statusCode).toBe(204)

    const actors = await server.inject(
      {
        method: 'GET',
        url: '/movies',
      }
    )
    expect(actors.payload).toBe(JSON.stringify([]))
  })
})