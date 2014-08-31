'use strict';

describe('Service: Places', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var Places;
  beforeEach(inject(function (_Places_) {
    Places = _Places_;
  }));

  it('should do something', function () {
    expect(!!Places).toBe(true);
  });

});
