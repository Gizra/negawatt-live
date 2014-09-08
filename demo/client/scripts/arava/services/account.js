'use strict';

angular.module('app')
  .service('Account', function Detector($http, $q, moment, BACKEND_URL) {
    var account = this;

    function lastYear(data) {
      var series = [];

      // Remove sites.
      data = angular.fromJson(data);

      // Create array.
      angular.forEach(data.months, function(month, index) {
        this.push([
            moment(month.date).format('M'),
            month.kwh
          ]);
      }, series);

      return series;
    }

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

      account.get(selection, lastYear).then(function(response) {
        console.log('response:', response.data);

        chart = {};
        chart.data1 = response.data;

        deferred.resolve(chart);

      });


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
    this.get = function (selection, transformResponse) {
      var options = {
        method: 'GET',
        url: BACKEND_URL + '/account',
        params: selection
      };

      if (transformResponse) {
        options.transformResponse = transformResponse
      };

      return $http(options);
    };



  });
