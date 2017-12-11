var fs = require('fs');

module.exports = (app) => {
    app.get("/connect", (req, res) => {
        res.send("true");
    });

    app.get("/install", (req, res) => {
        res.sendFile(req.ROOT_PATH + "/APK/agiledocument.apk");
    });
}