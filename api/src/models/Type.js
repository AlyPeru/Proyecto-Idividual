const {DataTypes} = require('sequelize');
//exportamos ua funcion que define el modelo
//Luego le injectamos la conexion a sequelize
module.exports = (sequelize) =>{
    //defino el modelo de occupation
    sequelize.define('type', {
        name : {
            type : DataTypes.STRING,
            allowNull: false,
        },
    //en este caso no requiere especificar ID porque me alcanza con el que genere sequelize
    });
};