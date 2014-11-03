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
        method: 'GET',
        withCredentials: true,
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


    /**
     * Get leaflet map center object.
     *
     * @param account
     * @returns {{zoom: *, lat: *, lng: *}}
     */
    this.getMapCenter = function(account) {
      return {
        zoom: account.zoom,
        lat: account.lat,
        lng: account.lng
      };
    };


  });
