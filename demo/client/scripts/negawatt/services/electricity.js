'use strict';

angular.module('app')
  .service('Electricity', function ($q, $http, BACKEND_URL) {

    /**
     * Return counters
     *
     *   {
     *
     *  }
     *
     * @returns {*}
     */
    this.get = function(filters) {
      var url = '/api/electricity' + filters;

      return $http({
        method: 'GET',
        url: url
      });
    };

  });
