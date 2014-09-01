'use strict';

angular.module('aravaApp')
  .service('Account', function Detector($q, $http, Config) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = {};

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
     * @returns {*}
     */
    this.getCounters = function(selection) {
      return $http({
        method: 'GET',
        url: Config.BACKEND_URL + '/account',
        params: selection
      }).success(function(account) {
        data.account = account;
      });
    };

  });
