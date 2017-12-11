module.exports = (sequelize, Sequelize) => {

    var Campo = sequelize.define('campo', {
        nome: Sequelize.STRING
    });

    Campo.associate = (model) => {
        Campo.belongsTo(model.modelo);
    }

    return Campo;
}