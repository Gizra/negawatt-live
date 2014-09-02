'use strict';

angular.module('aravaApp')
  .service('Counter', function ($q, $http, BACKEND_URL) {

    this.get = function() {
      return $http({
        method: 'GET',
        url: BACKEND_URL + '/counters'
      });
    };

  });
