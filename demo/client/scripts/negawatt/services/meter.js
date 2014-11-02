'use strict';

angular.module('app')
  .service('Meter', function ($q, $http, BACKEND_URL) {

    /**
     * Return meters mock data
     *
     *   {
     *     lists: [
     *       counter1: {
     *         lat:,
     *         lng:,
     *         focus: false,
     *         message: 'test message',
     *         title: 'test title',
     *         draggable: false
     *       }
     *
     *     ]
     *  }
     *
     * @returns {*}
     */
    this.get = function() {
      var url = BACKEND_URL + '/api/iec_meters';

      return $http({
        headers: {
          'X-CSRF-Token': 'C3j6TUuskEiVQd7Bm3U2Xe_W2Ya6On659x3ObHgVs_0'
        },
        method: 'GET',
        withCredentials:  true,
        url: url
      });
    };

  });
