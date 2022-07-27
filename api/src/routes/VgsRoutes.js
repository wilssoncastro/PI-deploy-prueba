const{ Router } = require ('express');
const router = Router();
const axios = require('axios');
const {Videogame, Genre} = require('../db');
const { YOUR_API_KEY } = process.env;
const { allGames } = require('../Utils/getterInfo');
const { getAllVideoGames,postVideogame } = require('../Controladores/VideoGamesControlers');

allGames();

router.get('/', getAllVideoGames);
router.post('/',postVideogame);


module.exports = router;

