const axios = require('axios');
const {Genre} = require('../db');
const { YOUR_API_KEY } = process.env;

module.exports={getAllGenres:async(req,res)=>{
    try {
      const todo = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
      let td = await  todo.data.results.map(el=>el.name);
      td.forEach((e)=>{
        Genre.findOrCreate({
          where:{
            name:e
          }
        })
      })
      const allGenres = await Genre.findAll();
      res.status(200).send(allGenres) 
      } catch (error) {
        res.status(404).send('Genero no encontrado');
      }
  }}