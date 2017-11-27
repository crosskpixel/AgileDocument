module.exports = function (sequelize, Sequelize) {

    var Arquivo = sequelize.define('arquivo', {
        arquivo: Sequelize.STRING,
        identificador: Sequelize.STRING
    });

    Arquivo.associate = function (model) {
        Arquivo.belongsTo(model.documento);
        Arquivo.belongsTo(model.campo);
    }
    return Arquivo;

}