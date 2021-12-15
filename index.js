require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()

const pokemonRoutes = require('./routes/index')
const port = 3000

app.use(cors())
app.get('/', (req, res) => res.status(200).send({
  'list pokemons': `${process.env.HOST}/pokemons`,
  'get pokemon': `${process.env.HOST}/pokemons/:id`
}))
app.use('/pokemons', pokemonRoutes)

const server  = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = {app, server}