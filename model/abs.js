let {database,user,password,dialect,host} = require("./../configdb.json");
var path = require('path');
var fs = require('fs');
var Sequelize = require('sequelize');
const sequelize = new Sequelize(database,user,password, {	//configuracao do banco de dados
    host: host,
    dialect: dialect,
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
});

var db = {};
var lodash = require('lodash');

fs.readdirSync(__dirname)					//le todos arquivos dentro da pasta atual ou seja model
    .filter(function (file) {					//filtra os arquivos para q não leia o arquivo atual ou sej abs.js
        return (file !== 'abs.js');
    })
    .forEach(function (file, key) {			//para cada arquivo, importa para model e lança a variavel db
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db)							//faz uma verificacao em cada model, caso haja associacao q seja devidamente tratada
    .forEach(function (model) {
        if (!db[model].hasOwnProperty('associate')) {
            return;
        }
        return db[model].associate(db);
    });

module.exports = lodash.extend({		//exporta estes parametros para todos os model para que sejam inicializados
    Sequelize: Sequelize,
    sequelize: sequelize,
}, db);