var fs = require('fs');

module.exports.createDirectoryByDate = function (data, callback) {

    var criaDirectorioAno = function (ano, callback) {
        var existe = fs.existsSync('ARQUIVOS/Documentos/' + ano);
        if (existe) {
            callback(true);
        } else {
            fs.mkdirSync('ARQUIVOS/Documentos/' + ano);
            var existe = fs.existsSync('ARQUIVOS/Documentos/' + ano);
            if (existe) {
                callback(true);
            } else {
                throw new Error('Ocorreu um erro GRAVE ao criar Directorio ano');
            }
        }
    }

    var criaDirectorioMes = function (ano, mes, callback) {
        var existe = null;
        existe = fs.existsSync('ARQUIVOS/Documentos/' + ano + '/' + mes);
        if (existe) {
            callback(true);
        } else {
            fs.mkdirSync('ARQUIVOS/Documentos/' + ano + '/' + mes);
            existe = fs.existsSync('ARQUIVOS/Documentos/' + ano + '/' + mes);
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


module.exports.defineExtesionFile = function (reqFiles) {
    console.log(reqFiles);
    var type = reqFiles.file.type;
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