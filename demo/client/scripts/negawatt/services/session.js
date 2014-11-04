/**
 * Created by gizra on 11/4/14.
 *
 * Service to handle session manger.
 */

'use strict';

angular.module('app')
  .service('Session', function () {
    var Session = this;

    /**
     * Return the profile information of the user login of undefined if not user is logged.
     *
     * @returns {string|undefined}
     */
    this.getProfile = function() {
      return Session.profile || undefined;
    };

    /**
     * Return interceptor definition to handle session routering.
     *
     * @returns {Function}
     */
    this.interceptor = function() {
      return function($q) {
        return {
          request: function(config) {
            console.log('request: ', config);
            return config;
          },
          response: function(result) {
            //console.log('response:', result);
            return result;
          },
          responseError: function(rejection) {
            return $q.reject(rejection);
          }
        };
      };
    };

  });
