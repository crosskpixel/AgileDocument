var { files } = require("./../configapp.json");
var { directory } = files;
var fs = require('fs');

module.exports.createDirectoryByDate = (data, callback) => {
    var criaDirectorioAno = (ano, callback) => {
        var existe = fs.existsSync(directory + ano);
        if (existe) {
            callback(true);
        } else {
            fs.mkdirSync(directory + ano);
            var existe = fs.existsSync(directory + ano);
            if (existe) {
                callback(true);
            } else {
                throw new Error('Ocorreu um erro GRAVE ao criar Directorio ano');
            }
        }
    }

    var criaDirectorioMes = (ano, mes, callback) => {
        var existe = null;
        existe = fs.existsSync(directory + ano + '/' + mes);
        if (existe) {
            callback(true);
        } else {
            fs.mkdirSync(directory + ano + '/' + mes);
            existe = fs.existsSync(directory + ano + '/' + mes);
            if (existe) {
                callback(true);
            } else {
                throw new Error('Ocorreu um erro GRAVE ao criar directorio mes')
            }
        }
    }

    var ano = data.getFullYear();
    var mes = data.getMonth() + 1;

    criaDirectorioAno(ano, resultAno => {
        if (resultAno) {
            criaDirectorioMes(ano, mes, resultMes => {
                callback(true);
            });
        } else {
            console.log('ferrou Pathdocs linha 45');
        }
    });


}


module.exports.defineExtesionFile = (reqFiles) => {
    var name = Object.keys(reqFiles)[0];
    var type = reqFiles[name].type;
    if (type === 'image/jpeg') {
        return '.jpg';
    } else if (type === 'image/png') {
        return '.png';
    } else if (type === 'image/jpg') {
        return '.jpg';
    } else if (type === 'image/**') {
        return '.jpg';
    } else if (type === "application/octet-stream") {
        return ".jpg"
    } else {
        throw new Error('Formato de Arquivo Invalido !!!');
    }
}