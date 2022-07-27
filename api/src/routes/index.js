const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame, Genre} = require('../db.js');
const { YOUR_API_KEY } = process.env;
const VgsRoutes = require('./VgsRoutes');
const VgRoutes = require('./VgRoutes');
const GenRoutes = require('./GenRoutes');
const { allGames } = require('../Utils/getterInfo')
const router = Router();


// Configurar los routers
router.use('/videogames',VgsRoutes)
router.use('/videogame',VgRoutes);
router.use('/genres', GenRoutes);
// Ejemplo: router.use('/auth', authRouter);
allGames();

  module.exports = router;
  // // dale=dale.join().split(',');