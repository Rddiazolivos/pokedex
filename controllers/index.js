const axios = require('axios');
var client = require('../redis');
const getPokemons =  async (req, res) => {
  try {
    const pokemons = await client.get('getPokemons')
    if (pokemons) {
      res.status(200).send({
        pokemons: JSON.parse(pokemons),
        message: "data retrieved from the cache"
      });
    } else {
      const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemones =  await Promise.all(
        pokemons.data.results.map(
          async ({url}) => {
            const pokemon = await axios.get(url);
            const {abilities, types, weight, id} = pokemon.data
            const photo = pokemon.data.sprites.other['official-artwork']['front_default']
            return {
              url: `${process.env.HOST}/pokemons/${id}`, 
              abilities, 
              types, 
              weight,
              photo
            };
          }
        )
      )
      await client.set('getPokemons', JSON.stringify(pokemones));
      res.status(200).send({
          pokemons: pokemones,
      });	
    }
  } catch(err) {
    res.status(500).send({message: err.message});
  }
}
const getPokemon = async (req, res) => {
  const id = req.params.id
  try {
    let pokemon = await client.get(`pokemon-${id}`)
    if (pokemon) {
      pokemon = JSON.parse(pokemon)
      res.status(200).send({
        ...pokemon,
        message: "data retrieved from the cache"
      });
    } else {
      const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let envolves = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
      envolves = envolves.data.chain.evolves_to.map( ({species}) => {
        return species.name
      })
      const {abilities, types, weight} = pokemon.data
      const photo = pokemon.data.sprites.other['official-artwork']['front_default']
      const newPokemon = {
        abilities, types, weight, envolves, photo
      }
      await client.set(`pokemon-${id}`, JSON.stringify(newPokemon))
      res.status(200).send({
        ...newPokemon
      });
    }	
  } catch(err) {
    res.status(500).send({message: err.message});
  }
}

module.exports =  {
  getPokemons,
  getPokemon
}