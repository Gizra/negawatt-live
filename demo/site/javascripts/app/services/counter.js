'use strict';

angular.module('aravaApp')
  .service('Counter', function Detector($q, $http, Config) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = {};

    /**
     * Get all the counters.
     */
    this.getCounters = function() {
      return $http({
        method: 'GET',
        url: Config.BACKEND_URL + '/counters'
      }).success(function(counters) {
        data.counters = counters;
      });
    };

  });
