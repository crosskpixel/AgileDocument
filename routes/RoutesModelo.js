var db = require('./../model/abs');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(req.ROOT_PATH + '/views/index.html');
    });


    app.get('/validaCampoModelo/:idmodelo', function (req, res) {

        var idModelo_verify = req.params.idmodelo;
        idModelo_verify = idModelo_verify.toLowerCase();

        db.modelo.findOne({
            where: {
                identificador: idModelo_verify
            }
        }).then(result => {
            if (result == null) {
                res.send('true');
            } else {
                res.send('false');
            }
        });
    });

    app.post('/cadastrarmodelo', function (req, res) {
        console.log(req.body);

        var nomeModelo = req.body.nomeModelo;
        var modeloId = req.body.modeloId;
        var campos = JSON.parse(req.body.campos);


        console.log(nomeModelo);
        console.log(modeloId);

        db.modelo.create({
            identificador: modeloId,
            nome: nomeModelo
        }).then(modelo => {
            for (var key in campos) {
                var campo = campos[key];
                db.campo.create({
                    modeloId: modelo.id,
                    nome: campos[key]
                });
            }
        });

        res.send('true');
    })

}