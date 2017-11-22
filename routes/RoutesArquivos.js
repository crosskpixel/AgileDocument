var db = require('./../model/abs.js');
var crypto = require('crypto');
var gerador = require('./../utils/GeradorHash.js');
var multipart = require('connect-multiparty');
var multipartMiddle = multipart();
var path = require('./../utils/GeradorDePastas.js');
var fs = require('fs');
var qrCode = require('qrcode-npm');
module.exports = function (app) {
    //Gera um novo documento de acordo com o parametro de modelo: e retorna os campos
    // com seus identificadores, logo aós isso ,faça o envio para ???
    // e na url ??? ,é possivel pegar a url da imagem
    app.get('/novoDocumento/:modeloid', function (req, res) {

        var identificadorModelo = req.params.modeloid;

        db.modelo.findAll({
            where: {
                identificador: identificadorModelo
            }
        }).then(modelo => {
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
                            }).then(arquivoAbstrato => {
                                var arquivo = {
                                    nome: campos[key].nome,
                                    identificador: identificador
                                }
                            });
                        }
                    });
                });

            });

            /* var qr = qrcode.qrcode(4, 'M');
             qr.addData(hashQRCode);
             qr.make();
 
             qr.createImgTag(4);    // creates an <img> tag as text
             qr.createTableTag(4);
 
             res.send(qr);*/
            var qr = qrCode.qrcode(5, 'M');
            qr.addData(hashQRCode);
            qr.make();

            var htmlQRCODE = qr.createImgTag(6);
            res.send(htmlQRCODE);
        });
    });

    //busca os registros referentes a cada arquivo do documento com um indentificador
    app.get('/getCampos/:qrCodeDocumento', function (req, res) {

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
    });


    app.post('/sendFile/:identificadorArquivo', multipartMiddle, function (req, res) {
        var identificador = req.params.identificadorArquivo;

        try {
            var extension = path.defineExtesionFile(req.files);

            db.arquivo.findOne({ where: { identificador: identificador } }).then(documento => { //?
                var now = new Date();
                var nameFile = (now.getDate().toString() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '-Cod-' + (Math.floor(Math.random() * 1687).toString(16)));

                path.createDirectoryByDate(now, function (result) {
                    if (result) {
                        if (documento === null) {
                            res.send('Documento não encontrado');
                        } else {

                            var destDestiny = '/ARQUIVOS/Documentos/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + nameFile + extension;
                            var source = fs.createReadStream(req.files.file.path);
                            var dest = fs.createWriteStream(req.ROOT_PATH + destDestiny);

                            source.pipe(dest);
                            source.on('end', function () {
                                console.log('COPY SUCCESSFULL !!!!');
                            });
                            source.on('error', function (err) {
                                console.log(err);
                                res.send(err);
                            });

                            //persist;,
                            db.arquivo.update({
                                arquivo: destDestiny
                            }, {
                                    where: {
                                        id: documento.id
                                    }
                                }).then(arquivo => {
                                    console.log(arquivo);
                                    res.send('true');
                                });
                        }
                    }
                });
            });
        } catch (err) {
            res.send(err);
        }

    });


    app.get('/getFile/:identificadorArquivo', function (req, res) {

        db.arquivo.findOne({
            where: {
                identificador: req.params.identificadorArquivo
            }
        }).then(arquivo => {
            console.log(arquivo);
            if (arquivo == null) {
                res.send('false');
            } else {
                res.sendFile(req.ROOT_PATH + arquivo.arquivo);
            }
        });

    });

}