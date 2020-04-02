// import request from 'supertest'
import server from '../src/app'

// test('default route', () => {
//   request(server)
//     .get('/')
//     .then(response => {
//       expect(response.status).toBe(200)
//     })
// })

test('GET `/` route', () => {
  server.inject(
    {
      method: 'GET',
      url: '/',
    },
    (err, res) => {
      expect(res.statusCode).toBe(200)
      expect(res.payload).toBe('hello there')
    }
  )
})
