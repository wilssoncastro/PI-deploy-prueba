const { DataTypes, Sequelize } = require('sequelize');
// import { v4 as uuidv4 } from ('uuid');

module.exports = (Sequelize) =>{
    Sequelize.define('genre',{
    name:{
        type:DataTypes.STRING,
    }
    },{timestamps: false});
}