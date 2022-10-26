const { Router } = require('express');
const { getPokemons, getPokemonsById, getPokemonsByName, createPokemon } = require('../controllers/pokemon.js')

const pokemonRouter = Router();

//get pokemons
//get pokemons/{id}
//get pokemons?name='...'
//post pokemons

pokemonRouter.get('/', async (req, res) => {
    try {
        const pokemons = await getPokemons();
        // console.log(pokemons)
        res.send(pokemons);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

module.exports = pokemonRouter;