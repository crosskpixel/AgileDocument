var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var load = require('express-load');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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

var db = require('./model/abs.js');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Created');
});

load('controller')
  .then('routes')
  .into(app);


  app.get("/connect",function(req,res){
      res.send("true");
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
app.listen(80, function () {
  console.log('macImages port>80');
});
