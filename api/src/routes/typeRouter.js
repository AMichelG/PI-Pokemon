const { Router } = require('express');
const getTypes = require('../controllers/type.js')

const typeRouter = Router();

typeRouter.get('/', async (req, res) => {
    try {
        const types = await getTypes();
        // console.log(types)
        res.send(types);
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

module.exports = typeRouter;