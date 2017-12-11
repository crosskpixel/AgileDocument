module.exports = (sequelize, Sequelize) => {

    var Documento = sequelize.define('documento', {
        qrCode: Sequelize.TEXT
    });

    Documento.associate = (model) => {
        Documento.belongsTo(model.modelo);
    }

    return Documento;

}