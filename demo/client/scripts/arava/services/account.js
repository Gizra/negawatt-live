'use strict';

angular.module('app')
  .service('Account', function Detector($http, $q, moment, BACKEND_URL) {
    var account = this;

    /**
     * Get report (to draw chart) data from a selection of time.
     *
     * If not exists selection by default ask by the last months.
     *
     * @param selection
     */
    this.getReport = function(selection) {
      var chart,
        deferred = $q.defer();

      // Define by default last year
      if (angular.isUndefined(selection)) {
        selection = {
          start: moment().format('YYYY') + '01',
          end: moment().format('YYYYMM')
        };
      }

      // Get account data.


      chart = {};
      chart.data1 = [
        [1, 15],
        [2, 20],
        [3, 14],
        [4, 10],
        [5, 10],
        [6, 40],
        [7, 30],
        [8, 26],
        [9, 22]
      ];

      deferred.resolve(chart);

      return deferred.promise;

    };

    /**
     * Get city account consumption details.
     *
     * @param selection
     *  Based in a period of time.
     *
     *  {
     *    start: string, // format YYYYMM for both.
     *    end: string
     *  }
     *
     *  $http transform this object to ?start=201401&end=201407
     *
     * @returns {*}
     */
    this.get = function (selection) {
      return $http({
        method: 'GET',
        url: BACKEND_URL + '/account',
        params: selection
      });
    };



  });
