var db = require('./../model/abs');
var modeloCtrl = require("./../controller/ModeloController");

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(req.ROOT_PATH + '/views/index.html');
    });

    //Metodo responsavel por identificar se este modelo está disponivel !
    //Method responsible for identifying if this model is available!
    app.get('/validFieldModel/:idmodelo',modeloCtrl.validaCamposDoModelo);


    //Cadastra o modelo , e atráves da url = "novoDocumento/<<identificador>>" ou "novoDocumentoString/<<identificador>>"
    //é possivel criar o documento !!

    /*Register the template, and through the url = "newDocument /" identifier "" or "newDocumentoString /" "identifier"
    // it is possible to create the document !! */
    app.post('/registermodel',modeloCtrl.cadastrarModelo);

}