/**
 * Created by gizra on 11/4/14.
 *
 * Service to handle session manger.
 */

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

      return localStorageService.get('access_token')|| undefined;
    };

    /**
     * Return the access token in a query string to be add, on each quey
     *
     * @returns {*}
     */
    this.token = function() {
      return (Session.info()) ? Utils.createQueryString(Session.info(), 'token') : undefined;
    };



  });
