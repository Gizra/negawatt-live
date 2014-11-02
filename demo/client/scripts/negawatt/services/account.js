'use strict';

angular.module('app')
  .service('Account', function Detector($http, $q, moment, BACKEND_URL, Meter) {

    /**
     * Return dashboard start information.
     *
     * @param data
     *
     * @returns {*}
     */
    function transformResponse(data) {
      data = JSON.parse(data);
      data.meter_list = Meter.toObject(data.meter);

      return data;
    }

    /**
     * Get account details, including the meter list.
     *
     * @returns {*}
     */
    this.get = function () {
      var url = BACKEND_URL + '/api/accounts?filter[id]';

      return $http({
        headers: {
          'X-CSRF-Token': 'C3j6TUuskEiVQd7Bm3U2Xe_W2Ya6On659x3ObHgVs_0'
        },
        method: 'GET',
        withCredentials:  true,
        url: url,
        transformResponse: transformResponse
      });
    };


  });
