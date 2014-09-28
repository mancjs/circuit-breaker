var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');

var _ = require('underscore');
var Mine = require('./lib/mine.js');
var CircuitBreaker = require('./lib/circuit-breaker.js');

var initialiseMines = function() {
  return [
    new CircuitBreaker(new Mine('coal-one'), 10000),
    new CircuitBreaker(new Mine('coal-two'), 10000),
    new CircuitBreaker(new Mine('khaz-modan'), 10000),
    new CircuitBreaker(new Mine('copper-one'), 10000),
    new CircuitBreaker(new Mine('copper-two'), 10000)
  ];
};

var listMines = function(mines, callback) {
  var list = function(mine, callback) {
    return mine.list(callback);
  };

  async.map(mines, list, function(err, resources) {
    if (err) {
      console.log('error listing mines: ' + err);
      return callback(err);
    }

    return callback(null, _.flatten(resources));
  });
};

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mines = initialiseMines();

app.get('/list', function(req, res) {
  listMines(mines, function(err, resources) {
    return err ? res.status(500).end() : res.json(resources);
  });
});

app.post('/purchase', function(req, res) {
  // req.body.Id holds id of resource the client
  // wants to purchase. Make a purchase request
  // to the correct mine to purchase it.
  return res.json({ msg: 'not implemented' });
});

app.listen(process.env.PORT || 5000);