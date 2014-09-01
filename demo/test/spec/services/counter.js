'use strict';

describe('Factory: Config', function () {

  // load the service's module
  beforeEach(module('aravaApp'));

  // instantiate service
  var ENV;
  beforeEach(inject(function (_ENV_, _Config_) {
    ENV = _ENV_;
    config = _Config_;
  }));

  it('should be define an environment', function () {
    expect(ENV).toBeDefined();
  });

  it('should be a backend url the enviroment', function () {
    expect(config.BACKEND_URL).ֹtoBe('http://server.com');
  });

});
