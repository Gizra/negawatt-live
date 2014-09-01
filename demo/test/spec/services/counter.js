'use strict';

describe('Service: Counter', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var counter;
  beforeEach(inject(function (_Counter_) {
    counter = _Conunter_;
  }));

  it('should be define an list of counters', function () {
    expect(counter).toBeDefined();
  });

});
