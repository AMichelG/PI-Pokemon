const axios = require('axios');
const { Type } = require('../db.js');

async function getTypes() {

    const { data } = await axios.get('https://pokeapi.co/api/v2/type?limit=18')
    const types = data.results.map(type => {
        return {
            name: type.name
        }
    })

    types.forEach(types => {
        Type.findOrCreate({
            where: { name: types.name }
        })
    })
    //await Type.bulkCreate(types)  No sirve hacer bulkCreate por que cada que se monta el componente Creation se duplican los generos
    const allTypes = await Type.findAll()
    return allTypes;
};

module.exports = getTypes;