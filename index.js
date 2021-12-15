const express = require('express')
const app = express()

const pokemonRoutes = require('./routes/index')

const port = 3000

const redis = require('redis')
const redisPort = 6379
const client = redis.createClient(redisPort);
client.on("error", (err) => {
  console.log(err);
});

// (async () => {
//   await client.connect();

//   await client.set('key', 'rik');
//   const value = await client.get('key');
//   console.log(value)
// })();

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/pokemons', pokemonRoutes)
const server  = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = {app, server}