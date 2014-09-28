/***

  The default circuit breaker just chains through
  to underlying .list/.purchase functions.

  Handle these functions explicitly to intercept timeout
  and other errors and create state to determine when the
  circuit breaker should skip acessing the underlying resource.

***/

var CircuitBreaker = function(mine, timeout) {
  var _mine = mine;

  if (timeout) {
    _mine.setTimeout(timeout);
  }

  this.list = function() {
    return _mine.list.apply(_mine, arguments);
  };

  this.purchase = function() {
    return _mine.purchase.apply(_mine, arguments);
  };
};

module.exports = CircuitBreaker;