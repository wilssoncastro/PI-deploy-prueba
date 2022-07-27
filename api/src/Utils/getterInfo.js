const axios = require('axios');
const {Genre, Videogame} = require('../db');
const { YOUR_API_KEY } = process.env;

var apiInfo =[];

const getApiInfo = async (url) =>{
    
    if(apiInfo.length < 99){
    const apiUrl = await axios.get(url);
    const data2 = await axios.get(apiUrl.data.next);
    const data3 = await axios.get(data2.data.next);
    const data4 = await axios.get(data3.data.next);
    const data5 = await axios.get(data4.data.next)
    // const data6 = await axios.get(data5.data.next)
    const union = data3.data.results.concat(data4.data.results);
    const filtro = apiUrl.data.results.concat(data2.data.results);
    const td = filtro.concat(union);
    const todo = data5.data.results.concat(td);
    // const all = todo.concat(td)
    
    apiInfo = todo.map(e =>{
        return{
            id:e.id,
            name:e.name,
            background_image:e.background_image,
            released:e.released,
            rating:e.rating,
            description:e.description,
            genres:e.genres.map(e => {return e.name}).join(" "),
            platform: e.platforms.map(e => e.platform.name),
        }
    })
    return apiInfo
    
}
    // for(let i=0;i<= apiInfo.length;i++){
    //     const tango = await Videogame.findOrCreate({
    //         where:{
    //             name: apiInfo[i].name,
    //             background_image:apiInfo[i].background_image,
    //             released: apiInfo[i].released,
    //             rating: apiInfo[i].rating,
    //             description:apiInfo[i].description,
    //             genres:apiInfo[i].genres,
    //             plataform: apiInfo[i].plataform
    //         }
    //     })
        // return tango;
    // }
    return apiInfo
};

const getInfo = async () =>{
    const dbData = await Videogame.findAll({
        include:{
            model:Genre,
            attribute: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return dbData
}
const allGames = async () => {
    const api = await getApiInfo(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
    const dbInfo = await getInfo();
    const allInfo = api.concat(dbInfo);
    return allInfo
}


// var apiInfo =[];

// const getApiInfo = async (url) =>{
    
//     if(apiInfo.length < 99){
//     const apiUrl = await axios.get(url);
//     // es conveniente utilizar el map por sobre el filter ya que este nos sirve para busquedas mas expecificas;
//     apiInfo = apiInfo.concat(apiUrl.data.results.map(e =>{
//         return{
//             id:e.id,
//             name:e.name,
//             background_image:e.background_image,
//             released:e.released,
//             rating:e.rating,
//             description:e.description,
//             genres:e.genres.map(el=>el.name).join(" "),
//             plataform: e.platforms.map(e => e.platform.name),
//         }
//     }))
//     return apiInfo.concat(getApiInfo(apiUrl.data.next))
    
// }else {
//     return apiInfo
// };
// }
// const getDbInfo = async () =>{
//     const dbData = await Videogame.findAll({
//         include:{
//             model:Genre,
//             attribute: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     })
//     return dbData
// }
// const allGames = async () => {
//     const api = await getApiInfo(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
//     const dbInfo = await getDbInfo();
//     const allInfo = api.concat(dbInfo);
//     return allInfo
// }

module.exports={allGames};