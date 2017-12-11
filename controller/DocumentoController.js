var db = require('./../model/abs.js');
var crypto = require('crypto');
var gerador = require('./../utils/GeradorHash.js');
var multipart = require('connect-multiparty');
var multipartMiddle = multipart();
var path = require('./../utils/GeradorDePastas.js');
var fs = require('fs');
var qrCode = require('qrcode-npm');
var { files } = require("./../configapp.json");
let { directory } = files;

module.exports.novoDocumento = (req, res) => {
    var identificadorModelo = req.params.modeloid;
    db.modelo.findAll({
        where: {
            identificador: identificadorModelo
        }
    }).then(modelo => {
        if (modelo.length == 0) {
            res.send("false");
        } else {
            var idModelo = modelo[0].id;
            var hashQRCode = gerador.gerarHashPequeno();

            db.documento.create({
                modeloId: idModelo,
                qrCode: hashQRCode
            }).then(documento => {
                db.documento.findAll({
                    where: {
                        id: documento.id
                    }
                }).then(documento => {
                    db.campo.findAll({
                        where: {
                            modeloId: documento[0].modeloId
                        }
                    }).then(campos => {
                        for (var key in campos) {
                            var identificador = gerador.gerarHashPequeno();
                            db.arquivo.create({
                                identificador: identificador,
                                documentoId: documento[0].id,
                                campoId: campos[key].id
                            });
                        }
                    });
                });
            });

            var qr = qrCode.qrcode(5, 'M');
            qr.addData(hashQRCode);
            qr.make();

            var htmlQRCODE = qr.createImgTag(6);
            res.send(htmlQRCODE);
        }


    });
}

module.exports.novoDocumentoString = (req, res) => {
    try {
        var identificadorModelo = req.params.modeloid;
        db.modelo.findAll({
            where: {
                identificador: identificadorModelo
            }
        }).then(modelo => {
            if (modelo.length == 0) {
                res.send("false");
            }
            var idModelo = modelo[0].id;
            var hashQRCode = gerador.gerarHashPequeno();

            db.documento.create({
                modeloId: idModelo,
                qrCode: hashQRCode
            }).then(documento => {
                db.documento.findAll({
                    where: {
                        id: documento.id
                    }
                }).then(documento => {
                    db.campo.findAll({
                        where: {
                            modeloId: documento[0].modeloId
                        }
                    }).then(campos => {
                        for (var key in campos) {
                            var identificador = gerador.gerarHashPequeno();
                            db.arquivo.create({
                                identificador: identificador,
                                documentoId: documento[0].id,
                                campoId: campos[key].id
                            });
                        }
                    });
                });
            });
            res.send(hashQRCode);
        });
    } catch (err) {
        res.send(err);
    }
}

module.exports.getCamposByDocument = (req, res) => {
    var qrCodeDocumento = req.params.qrCodeDocumento;
    db.sequelize.query(`select arquivos.identificador,arquivos.arquivo,documentos.qrCode,campos.nome from arquivos,documentos,campos,modelos
    where documentos.qrCode = :qrCodeDocumento
        and documentos.id = arquivos.documentoId
            and arquivos.campoId = campos.id
             and modelos.id = campos.modeloId
              and campos.modeloId = documentos.modeloId`, {
            replacements: {
                qrCodeDocumento: qrCodeDocumento
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then(result => {
            if (result.length < 1) {
                res.send('false');
            }
            res.send(result);
        });
}

module.exports.sendFileForDocument = (req, res) => {

    var identificador = req.params.identificadorArquivo;
    try {
        var extension = path.defineExtesionFile(req.files);
        db.arquivo.findOne({ where: { identificador: identificador } }).then(documento => { //?
            var now = new Date();
            var nameFile = (now.getDate().toString() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '-Cod-' + (Math.floor(Math.random() * 1687).toString(16)));

            path.createDirectoryByDate(now, (result) => {
                if (result) {
                    if (documento === null) {
                        res.send('Documento não encontrado');
                    } else {
                        var destDestiny = (directory == "ARQUIVOS/Documentos/" ? req.ROOT_PATH + "/ARQUIVOS/Documentos/" : directory) + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + nameFile + extension;

                        //'/ARQUIVOS/Documentos/'
                        var nameCampo = Object.keys(req.files)[0]; //pega primeiro registro json,que no caso sera o arquivo !
                        var source = fs.createReadStream(req.files[nameCampo].path);

                        // var dest = fs.createWriteStream(req.ROOT_PATH + destDestiny);
                        var dest = fs.createWriteStream(destDestiny);
                        source.pipe(dest);
                        source.on('end', () => {
                            console.log('COPY SUCCESSFULL !!!!');
                            db.arquivo.update({
                                arquivo: destDestiny
                            }, {
                                    where: {
                                        id: documento.id
                                    }
                                });
                            res.send("true");
                        });
                        source.on('error', (err) => {
                            console.log(err);
                            res.send(err);
                        });
                    }
                }
            });
        });
    } catch (err) {
        res.send(err);
    }
}

module.exports.getFileByIdHash = (req, res) => {
    db.arquivo.findOne({
        where: {
            identificador: req.params.identificadorArquivo
        }
    }).then(arquivo => {
        if (arquivo == null) {
            res.send('false');
        } else {
            res.sendFile(arquivo.arquivo);
        }
    });
}