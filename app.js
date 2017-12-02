var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var load = require('express-load');
var app = express();
require("./config-express")(app);
// view engine setup


var db = require('./model/abs.js');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Created');
});

load('controller')
  .then('routes')
  .into(app);


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.listen(80, function () {
  console.log('agileDocument port>80');
});
