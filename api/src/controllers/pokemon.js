const axios = require("axios");
const { Type, Pokemon } = require("../db.js");

async function getPokemons() {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5");
  // console.log(data)
  const eachURL = data.results.map((pokemon) => axios.get(pokemon.url));

  const promisePokemon = await Promise.all(eachURL);

  const apiPokemon = promisePokemon.map((pokemon) => {
    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      image: pokemon.data.sprites.other["official-artwork"].front_default,
      types: pokemon.data.types.map((slot) => slot.type.name),
    };
  });

  //   console.log(apiPokemon);
  const dbPokemon = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return [...apiPokemon, ...dbPokemon];
}

async function getPokemonById(id) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

  //   console.log(data);

  const pokemonDetail = {
    id: data.id,
    name: data.name,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    specialAttack: data.stats[3].base_stat,
    defense: data.stats[2].base_stat,
    specialDefense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((slot) => slot.type.name),
  };
  return pokemonDetail;
}

async function getPokemonByName(name) {
  console.log(name);
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );

  //   console.log(data);

  const pokemonDetail = {
    id: data.id,
    name: data.name,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    specialAttack: data.stats[3].base_stat,
    defense: data.stats[2].base_stat,
    specialDefense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((slot) => slot.type.name),
  };

  if (!pokemonDetail) {
    const dbPokemon = Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });

    return dbPokemon;
  }

  return pokemonDetail;
}

async function createPokemon(
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
) {
  console.log(
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

  if (
    !name ||
    !hp ||
    !attack ||
    !specialAttack ||
    !defense ||
    !specialDefense ||
    !speed ||
    !height ||
    !weight ||
    !types
  ) {
    throw new Error("Info missing");
  }
  const newPokemon = await Pokemon.create({
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
  });

  const newPokemonTypes = types.map((type) =>
    Type.findOne({ where: { name: type } })
  );

  const w = await Promise.all(newPokemonTypes);

  const createdPokemon = await newPokemon.addType(w);

  return createdPokemon;
}

module.exports = {
  getPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
};
