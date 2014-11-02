'use strict';

angular.module('app')
  .service('Account', function Detector($http, $q, moment, BACKEND_URL, Utils) {
    var Account = this;

    /**
     * Return dashboard start information.
     *
     * @param data
     *
     * @returns {*}
     */
    function oneAccount(data) {
      data = JSON.parse(data).data[0];

      data.lat = parseFloat(data.location.lat);
      data.lng = parseFloat(data.location.lng);
      data.zoom = parseInt(data.zoom);

      delete data['location'];

      return data;
    }

    /**
     * Get accounts list, the list could be filtered.
     *
     * @param filters
     * @param fnTransformResponse
     *
     * @returns {*}
     */
    this.get = function (filters, fnTransformResponse) {
      var url = BACKEND_URL + '/api/accounts' + Utils.createQueryString(filters);

      var options = {
        headers: {
          'X-CSRF-Token': 'C3j6TUuskEiVQd7Bm3U2Xe_W2Ya6On659x3ObHgVs_0'
        },
        method: 'GET',
          withCredentials:  true,
        url: url
      };

      if (angular.isDefined(fnTransformResponse)) {
        options.transformResponse = fnTransformResponse;
      }

      return $http(options);
    };

    /**
     * Get account filter details, including the meter list.
     *
     * @param filter {*} - {label: string}
     *
     * @returns {*}
     */
    this.getAccount = function(filter) {
      return Account.get(filter, oneAccount);
    };


  });
