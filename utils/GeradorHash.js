module.exports.gerarHashPequeno = () => {
    var result = '';
    for (var i = 2; i > 0; --i) {
        result += (Math.floor(Math.random() * 256) + Math.random() * 9).toString(16).replace('.', '');
    }
    return result;
}