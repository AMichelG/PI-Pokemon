const axios = require("axios");
const { Type, Pokemon } = require("../db.js");

async function getPokemons() {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  // console.log(data)
  const eachURL = data.results.map((pokemon) => axios.get(pokemon.url));

  const promisePokemon = await Promise.all(eachURL);

  const apiPokemon = promisePokemon.map((pokemon) => {
    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      attack: pokemon.data.stats[1].base_stat,
      image: pokemon.data.sprites.other["official-artwork"].front_default,
      types: pokemon.data.types.map((slot) => slot.type.name),
    };
  });

  //   console.log(apiPokemon);
  const dbPokemonInfo = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    attributes: ["id", "name", "attack", "image", "created"]
  });
  console.log(dbPokemonInfo)
  const dbPokemon = dbPokemonInfo.map(pokemon => ({
    id: pokemon.id,
    name: pokemon.name,
    attack: pokemon.attack,
    image: pokemon.image,
    types: pokemon.types.map(type => type.name),
    created: pokemon.created
  }))
  // console.log(dbPokemon)

  return [...apiPokemon, ...dbPokemon];
}

async function getPokemonById(id) {
  if (id.length < 4) {

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
      types: data.types.map(type => type.type.name),
    };
    return pokemonDetail;
  }
  else {
    const data = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        though: {
          attributes: []
        }
      }
    })

    const pokemonDetail = {
      id: data.id,
      name: data.name,
      hp: data.hp,
      attack: data.attack,
      specialAttack: data.specialAttack,
      defense: data.defense,
      specialDefense: data.specialDefense,
      speed: data.speed,
      height: data.height,
      weight: data.weight,
      image: data.image,
      types: data.types.map(type => type.name)
    }
    return pokemonDetail
  }
}

async function getByNameInDB(name) {
  const data = await Pokemon.findOne({
    where: {
      name: name.toLowerCase(),
    },
    include: {
      model: Type,
      attributes: ["name"],
      though: {
        attributes: []
      }
    }
  });
  console.log(data)
  const pokemonInDb = {
    id: data.id,
    name: data.name,
    hp: data.hp,
    attack: data.attack,
    specialAttack: data.specialAttack,
    defense: data.defense,
    specialDefense: data.specialDefense,
    speed: data.speed,
    height: data.height,
    weight: data.weight,
    image: data.image,
    types: data.types.map(type => type.name)
  }
  return pokemonInDb
}

async function getByNameInAPI(name) {
  const data = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (data) {
    const pokemonInApi = {
      id: data.data.id,
      name: data.data.name,
      attack: data.data.attack,
      image: data.data.sprites.other["official-artwork"].front_default,
      types: data.data.types.map((slot) => slot.type.name),
    };
    return pokemonInApi;
  }
  return null
}


async function getPokemonByName(name) {
  try {
    const api = await getByNameInAPI(name)
    return api
  } catch (error) {
    const db = await getByNameInDB(name)
    return db
  }
  /*const api = await getByNameInAPI(name)
  if (api.error) {
    
  }
  return api*/

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

  name = name.toLowerCase();
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
  // console.log(types)
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

  const newPokemonTypes = await Type.findAll({
    where: {
      name: types,
    }
  });
  /*
    for (const type of types) {
      let pokemonType = await Type.findOne({
        where: { name: type }
      })
      console.log(pokemonType)
      await newPokemon.addType(pokemonType)
    }*/

  /*types.map((type) =>
    Type.findOne({ where: { name: type } })
  );*/

  // const w = await Promise.all(newPokemonTypes);
  // console.log(newPokemonTypes)
  await newPokemon.addType(newPokemonTypes);
  // console.log(newPokemon)
  return newPokemon;
}

module.exports = {
  getPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
};
