const { Router } = require('express');
const { getPokemons, getPokemon } = require("../controllers/index");

const router = Router();

router.get('/', getPokemons)
router.get('/:id', getPokemon)

module.exports = router