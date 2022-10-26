const axios = require('axios');
const { Type } = require('../db.js');

async function getPokemons() {

    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const types = data.results.map(type => {
        return {
            name: type.name
        }
    })

    console.log(types)
    await Type.bulkCreate(types)
    const allTypes = await Type.findAll()
    return allTypes;
};

async function getPokemonsById() {

};

async function getPokemonsByName() {

};

async function createPokemon() {

};

module.exports = { getPokemons, getPokemonsById, getPokemonsByName, createPokemon };