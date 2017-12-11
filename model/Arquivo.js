module.exports = (sequelize, Sequelize) => {

    var Arquivo = sequelize.define('arquivo', {
        arquivo: Sequelize.STRING,
        identificador: Sequelize.STRING
    });

    Arquivo.associate = (model) => {
        Arquivo.belongsTo(model.documento);
        Arquivo.belongsTo(model.campo);
    }
    return Arquivo;

}