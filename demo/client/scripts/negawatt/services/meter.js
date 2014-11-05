'use strict';

angular.module('app')
  .service('Meter', function ($q, $http, BACKEND_URL) {
    var Meter = this;

    /**
     * Convert the array of list of meters to and object of meters.
     *
     * @param list [] - list of meters in an array.
     *
     * [
     *    {
     *      id: "263",
     *      label: "meter1",
     *      self: "http://localhost/negawatt-server/www/api/v1.0/iec_meters/263",
     *      created: "1414928192",
     *      updated: "1414928192",
     *      contract: "1339935",
     *      place_description: "school",
     *      place_address: "herzel 22",
     *      place_locality: "kytiat gat",
     *      meter_code: "442",
     *      meter_serial: "36088587"
     *    },
     *    ...
     * ]
     *
     * @returns {*} - list of meters organized in an object, each meter it's a property defined by the id.
     *
     *   {
     *     meters: {
     *       id1: {
     *         lat:,
     *         lng:,
     *         message: 'test message',
     *         title: 'test title'
     *       }
     *
     *    }
     *  }
     *
     */
    this.toObject = function(list) {
      var meters = {};

      angular.forEach(angular.fromJson(list).data, function(item) {
        meters[item.id] = item;
        meters[item.id].lat = parseFloat(item.location.lat);
        meters[item.id].lng = parseFloat(item.location.lng);

        delete item['location'];
      });

      return meters;
    };


    /**
     * Return meters array from the server.
     *
     * @returns {*}
     */
    this.get = function() {
      var url = BACKEND_URL + '/api/iec_meters';

      return $http({
        method: 'GET',
        url: url,
        transformResponse: Meter.toObject
      });
    };

  });
