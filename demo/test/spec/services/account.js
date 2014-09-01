'use strict';

describe('Service: Account', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var account;
  beforeEach(inject(function (_Account_) {
    account = _Account_;
  }));

  it('should be define an account', function () {
    expect(acount).toBeDefined();
  });

});
