'use strict';

angular.module('aravaApp')
  .constant('ENV', 'development')
  .factory('Config', function Detector($q, $http, ENV) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var config = {};

    /**
     * Get config according the environment.
     */
    function getConfig(environment) {
      return $http({
        method: 'GET',
        url: 'config.json',
        serverPredefined: true
      }).success(function(data) {
        config = data.environment;
      });
    }

    return config;
  });
