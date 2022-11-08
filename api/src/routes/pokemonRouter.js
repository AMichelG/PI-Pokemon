const { Router } = require("express");
const {
  getPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
} = require("../controllers/pokemon.js");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemon = await getPokemonByName(name);
      res.send(pokemon);
    } else {
      const pokemons = await getPokemons();
      // console.log(pokemons)
      res.send(pokemons);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await getPokemonById(id);
    res.send(pokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

pokemonRouter.post("/", async (req, res) => {
  const {
    name,
    hp,
    attack,
    specialAttack,
    defense,
    specialDefense,
    speed,
    height,
    weight,
    image,
    types,
  } = req.body;
  // console.log('post', types)
  try {
    const newPokemon = await createPokemon(
      name,
      hp,
      attack,
      specialAttack,
      defense,
      specialDefense,
      speed,
      height,
      weight,
      image,
      types
    );
    res.send(newPokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = pokemonRouter;
