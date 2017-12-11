var multipart = require('connect-multiparty');
var multipartMiddle = multipart();
var documentoCtrl = require('./../controller/DocumentoController');

module.exports = (app) => {

    //Cadastra um documento com os campos do modelo, retorna um QRCode que deve ser scanneado pelo
    //smartphone e depois realizado um envio !!!
    app.get('/newDocument/:modeloid', documentoCtrl.novoDocumento);

    //Cadastra um documento, retorna um hash da imagem QRCode, que pode ser utilizado para utilizar em
    //outros tipos de sistemas.
    // http://???,???,?,???:????/getCampos/<<hashretornado>> retorna os campos com identificadores para realizar um envio !
    app.get('/newDocumentString/:modeloid', documentoCtrl.novoDocumentoString);

    //busca os todos os campos do hashQR do documento , com seus identificadores !
    app.get('/getFields/:qrCodeDocumento', documentoCtrl.getCamposByDocument);

    // é realizado o envio com os identificadores de cada campo separadamente !
    app.post('/sendFile/:identificadorArquivo', multipartMiddle, documentoCtrl.sendFileForDocument);

    //com o identificador do campo requisitado na url ="/getCampos/???"
    //é possivel atráves desta url fazer download ou visualização da imagem !
    app.get('/getFile/:identificadorArquivo', documentoCtrl.getFileByIdHash);

}