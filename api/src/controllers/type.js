const axios = require('axios');
const { Type } = require('../db.js');

async function getTypes() {

    const { data } = await axios.get('https://pokeapi.co/api/v2/type')
    const types = data.results.map(type => {
        return {
            name: type.name
        }
    })
    await Type.bulkCreate(types)
    const allTypes = await Type.findAll()
    return allTypes;
};

module.exports = getTypes;