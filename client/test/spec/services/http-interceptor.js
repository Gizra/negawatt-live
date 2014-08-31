'use strict';

describe('Service: AravaHttpInterceptor', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var AravaHttpInterceptor;
  beforeEach(inject(function (_AravaHttpInterceptor_) {
    AravaHttpInterceptor = _AravaHttpInterceptor_;
  }));

  it('should do something', function () {
    expect(!!AravaHttpInterceptor).toBe(true);
  });

});
