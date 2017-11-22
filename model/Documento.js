module.exports = function (sequelize, Sequelize) {

    var Documento = sequelize.define('documento', {
        qrCode: Sequelize.TEXT
    });

    Documento.associate = function (model) {
        Documento.belongsTo(model.modelo);
    }

    return Documento;

}