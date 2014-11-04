'use strict';

angular.module('app')
  .service('Account', function Detector($http, $q, moment, BACKEND_URL, Utils) {
    var Account = this;

    /**
     * Return the first account form the collection of acconts.
     *
     * @param data
     *
     * @returns {*}
     */
    function firstAccount(data, headers) {
      data = JSON.parse(data);
      if (data.status !== 200) {
        return;
      }

      data = data.data[0];

      data.location.lat = parseFloat(data.location.lat);
      data.location.lng = parseFloat(data.location.lng);
      data.location.zoom = parseInt(data.zoom);

      delete data['zoom'];

      return data;
    }

    /**
     * Get accounts first account.
     *
     * @param filters
     *
     * @returns {*}
     */
    this.getAccount = function (filters) {
      var url = BACKEND_URL + '/api/accounts' + Utils.createQueryString(filters);

      var options = {
        method: 'GET',
        withCredentials: true,
        url: url,
        transformResponse: firstAccount
      };

      return $http(options);
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
