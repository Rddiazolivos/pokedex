const supertest = require('supertest')
const redisClient = require('../redis')
const {app, server} = require('../index')
const api = supertest(app)

describe('list pokemons', ()=>{
  test('json format', async () => {
    await api
      .get('/pokemons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('have 151 pokemons', async () => {
    const response  = await api.get('/pokemons')
    expect(response.body.pokemons).toHaveLength(151)
  })
})

describe('pokemon', ()=>{
  test('json format', async () => {
    await api
      .get('/pokemons/1')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  server.close()
  redisClient.quit()
})