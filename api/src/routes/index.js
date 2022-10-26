const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRouter = require('./typeRouter.js')
const pokemonRouter = require('./pokemonRouter.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/type', typeRouter);
router.use('/pokemon', pokemonRouter);


module.exports = router;
