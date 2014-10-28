'use strict';

angular.module('app')
  .service('Electricity', function ($q, $http, BACKEND_URL) {

    /**
     * Return electricity consumption data (Kwh).
     *
     * @param {string} - query string to apply in the request.
     * @returns {$q.promise}
     */
    this.get = function(filters) {
      var url = BACKEND_URL + '/api/electricity' + filters;

      return $http({
        method: 'GET',
        url: url
      });
    };

  });
