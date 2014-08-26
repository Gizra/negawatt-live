'use strict';

describe('Service: BACKEND_URL', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var BACKEND_URL;
  beforeEach(inject(function (_BACKEND_URL_) {
    BACKEND_URL = _BACKEND_URL_;
  }));

  it('should do something', function () {
    expect(!!BACKEND_URL).toBe(true);
  });

});
