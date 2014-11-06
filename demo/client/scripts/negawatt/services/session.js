'use strict';

angular.module('app')
  .service('Auth', function($http, Utils, BACKEND_URL) {
    /**
     * Login by calling the Drupal REST server.
     *
     * @param user
     *   Object with the properties "username" and "password".
     *
     * @returns {*}
     */
    this.login = function(user) {
      return $http({
        method: 'GET',
        url: BACKEND_URL + '/api/login-token',
        headers: {
          'Authorization': 'Basic ' + Utils.Base64.encode(user.username + ':' + user.password)
        }
      });
    };
  })
  .service('Session', function (Utils, localStorageService) {
    var Session = this;

    /**
     * Return the session information {access_token}; also return undefined if the user never login,
     * and access_token in the local storage is empty.
     *
     * @returns {*} - profile object.
     */
    this.info = function(info) {
      if (angular.isDefined(info)) {
        localStorageService.set('access_token', info['access_token']);
      }

      return localStorageService.get('access_token');
    };

    /**
     * Return the parameters of the access token for the in a query string.
     *
     * @param operator {string} - operator used to add the token with the query string. '&' or '?'.
     * use '?' by default.
     *
     * @returns {*}
     */
    this.token = function(operator) {
      var filters;

      if (angular.isUndefined(operator)) {
        operator = '?';
      }

      filters = {
        'access_token': Session.info(),
        'operator': operator
      };

      return (Session.info()) ? Utils.createQueryString(filters, 'token') : undefined;
    };



  });
