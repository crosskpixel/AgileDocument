module.exports = function (sequelize, Sequelize) {

    var Modelo = sequelize.define('modelo',{
        nome: Sequelize.STRING,
        identificador: Sequelize.STRING
    });

    return Modelo;

}