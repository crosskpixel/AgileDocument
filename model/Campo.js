module.exports = function(sequelize,Sequelize){

    var Campo = sequelize.define('campo',{
        nome: Sequelize.STRING
    });

    Campo.associate = function(model){
        Campo.belongsTo(model.modelo);
    }

    return Campo;
}