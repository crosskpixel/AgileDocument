var path = require('path');
var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');

module.exports = (app) => {

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors({ origin: '*', allowedHeaders: ['Content-Type', 'Authorization'] }));
    app.use(function (req, res, next) {
        req.ROOT_PATH = __dirname;
        res.setHeader("Cache-Control", 'no-cache');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader('Access-Control-Allow-Credentials', false);
        res.setHeader('Access-Control-Max-Age', '1728000');
        next();
    });

}