'use strict';

angular.module('app')
  .service('Account', function Detector($http, $q, moment, BACKEND_URL, $filter) {
    var account = this;

    /**
     * Transform response data from account collection into and array, that
     * contain array with month number and kwh consumed.
     *
     * [
     *   [1, 3455667]
     *   [2, 5695667]
     *   [3, 5558124]
     *   [4, 9864567]
     *   ...
     * ]
     *
     * @param data
     * @returns {Array}
     */
    function lastYear(data) {
      var actual;
      var series = {
        high: [],
        medium: [],
        low: [],
        fixed: []
      };

      // Remove sites.
      data = angular.fromJson(data);

      // Create array.
      angular.forEach(data.months, function(month, index) {
        actual = moment(month.date).format('M');

        this.high.push([
            actual,
            month.top.kwh
          ]);

        this.medium.push([
          actual,
          month.medium.kwh
        ]);

        this.low.push([
          actual,
          month.low.kwh
        ]);

        this.fixed.push([
          actual,
          month.noUsed.kwh
        ]);
      }, series);

      return series;
    }

    /**
     * Transform response data from account collection into and array, that
     * contain array with week number and kwh consumed.
     *
     * [
     *   [1, 3455667]
     *   [2, 5695667]
     *   [3, 5558124]
     *   ...
     * ]
     *
     * @param data
     * @returns {Array}
     */
    function lastMonth(data) {
      var series = [];

      // Remove sites.
      data = angular.fromJson(data);

      // Create array.
      angular.forEach(data.weeks, function(week, index) {
        this.push([
          index,
          week.kwh
        ]);
      }, series);

      return series;
    }

    /**
     * Transform response data from account collection into and array, that
     * contain array with days of the number of days and kwh consumed in a week.
     *
     * [
     *   [1, 3455667]
     *   [2, 5695667]
     *   [3, 5558124]
     *   [4, 4355663]
     *   [5, 8231424]
     *   ...
     * ]
     *
     * @param data
     * @returns {Array}
     */
    function lastWeek(data) {
      var series = [];

      // Remove sites.
      data = angular.fromJson(data);

      // Create array.
      angular.forEach(data.days, function(day, index) {
        this.push([
          index,
          day.kwh
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
        fnTransform,
        deferred = $q.defer();

      // Define by default last year
      if (angular.isUndefined(selection)) {
        selection = {
          start: moment().format('YYYY') + '01',
          end: moment().format('YYYYMM')
        };
        fnTransform = lastYear;
      }

      // Create selection depending the value.
      if (angular.isString(selection)) {
        switch (selection) {
          case 'lastYear':
            fnTransform = lastYear;
            selection = {
              start: moment().format('YYYY') + '01',
              end: moment().format('YYYYMM')
            };
            break;
          case 'lastMonth':
          case 'lastWeek':
            fnTransform = (selection==='lastMonth') ? lastMonth : lastWeek;
            selection = {
              start: moment().subtract(1, 'months').format('YYYYMM'),
              end: moment().subtract(1, 'months').format('YYYYMM')
            };
            break;
        }
      }

      // Get account data.
      account.get(selection, fnTransform).then(function(response) {
        chart = {};
        chart.data = response.data;

        deferred.resolve(chart);
      });

      return deferred.promise;
    };

    /**
     * Get city account consumption details.
     *
     * @param selection
     *  Based in a period of time.
     * @param transformResponse
     *  Function to transform the data.
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
      }

      return $http(options);
    };

    this.getGroups = function() {
      return $http({
        method: 'GET',
        url: '../data/menus.json'
      });
    };

  });
