require('dotenv').config()
const express = require('express')
const app = express()

const pokemonRoutes = require('./routes/index')
const port = 3000

app.get('/', (req, res) => res.status(200).send({
  'list pokemons': `${process.env.HOST}/pokemons`,
  'get pokemon': `${process.env.HOST}/pokemons/:id`
}))
app.use('/pokemons', pokemonRoutes)
const server  = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = {app, server}