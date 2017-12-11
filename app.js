var express = require('express');
var cors = require('cors');
var load = require('express-load');
var app = express();
require("./config-express")(app);

var db = require('./model/abs.js');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Created');
});

load('controller')
  .then('routes')
  .into(app);

app.use(function (req, res, next) {
  res.send("URL invalidate");
});

// error handler
app.listen(80, function () {
  console.log('agileDocument port>80');
});
