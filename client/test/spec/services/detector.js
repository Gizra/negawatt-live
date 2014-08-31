'use strict';

describe('Service: Detector', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var Detector;
  beforeEach(inject(function (_Detector_) {
    Detector = _Detector_;
  }));

  it('should do something', function () {
    expect(!!Detector).toBe(true);
  });

});
