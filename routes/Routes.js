module.exports = (app) => {
    app.get("/connect", function (req, res) {
        res.send("true");
    });

    var fs = require('fs');
    app.get("/install", function (req, res) {
        var filePath = req.ROOT_PATH + "/APK/agiledocument.apk"
        var stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'application/vnd.android.package-archive',
            'Content-Length': stat.size
        });
        var readStream = fs.createReadStream(filePath);
        readStream.on('open', function () {
            readStream.pipe(res);
        });
        readStream.on("error", function (err) {
            res.send(err);
        })
    });
}