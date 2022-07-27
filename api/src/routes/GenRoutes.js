const{ Router } = require ('express');
const router = Router();
const { getAllGenres }= require('../controladores/genresControlador')
// const axios = require('axios');
// const {Videogame, Genre} = require('../db.js');
// const { YOUR_API_KEY } = process.env;
// const { getApiInfo, getDbInfo, allGames} = require('../Controladores/Vgs');

router.get('/', getAllGenres);

module.exports=router;