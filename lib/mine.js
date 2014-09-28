/***

  Handles the basic list and purchase functionality by making
  GET or POST requests to the server.

***/

var client = require('superagent');

var Mine = function(name) {
  var timeout = 10000;
  var listUrl = 'http://domitor.apphb.com/resources/mine/' + name;
  var purchaseUrl = 'http://domitor.apphb.com/resources/purchase';

  var list = function(callback) {
    client.get(listUrl)
          .timeout(timeout)
          .end(function(err, res) {
            return callback(err || res.error, res && res.body);
          });
  };

  var purchase = function(brokerName, resourceId, callback) {
    client.post(purchaseUrl)
          .timeout(timeout)
          .send({ brokerName: brokerName, mineId: name, resourceId: resourceId })
          .end(function(err, res) {
            return callback(err || res.error);
          });
  };

  var setTimeout = function(msec) {
    timeout = msec;
  };

  this.list = list;
  this.purchase = purchase;
  this.setTimeout = setTimeout;
};

module.exports = Mine;