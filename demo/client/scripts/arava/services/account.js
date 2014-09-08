'use strict';

angular.module('app')
  .service('Account', function Detector($http, BACKEND_URL) {

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
    }

  });
