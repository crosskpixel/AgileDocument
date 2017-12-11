var db = require('./../model/abs');

module.exports.validaCamposDoModelo = (req, res) => {
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
}

module.exports.cadastrarModelo = (req, res) => {
    var nomeModelo = req.body.nomeModelo;
    var modeloId = req.body.modeloId;
    var campos = JSON.parse(req.body.campos);
    db.modelo.findOne({
        where: {
            identificador: modeloId
        }
    }).then(result => {
        if (result == null) {
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
        } else {
            res.send('false');
        }
    });
}