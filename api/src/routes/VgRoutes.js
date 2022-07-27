
const{ Router } = require ('express');
const router = Router();
const axios = require('axios');
const {Videogame, Genre} = require('../db.js');
const { YOUR_API_KEY } = process.env;
// const { getGameById } = require('../Controladores/Game');
const { allGames } = require('../Utils/getterInfo');
// const router = require('./index.js');
allGames();
router.get('/:id',async(req,res,next)=>{
  const { id } = req.params;
if (!id){
  return res.status(404).send('Agregue su Id')
}
  else if (id.includes('-')){
    try {
      const gameDB = await Videogame.findOne({
        where:{
          id
        },
        include:[Genre],
      });
      return res.send(gameDB);
    } catch (error) {
      return res.status(404).send('No existe un juego asignado a ese id');
    }
    
  }else if(id){
    try {
      const gameApi = await axios.get( `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
      res.send(gameApi.data); 
    } catch (error) {
      return res.status(404).send('No existe un juego asignado a ese id');
    }
  }
});

module.exports = router;