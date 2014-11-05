/**
 * Created by gizra on 11/4/14.
 *
 * Service to handle session manger.
 */

'use strict';

angular.module('app')
  .service('Session', function ($http, Utils) {
    var Session = this;

    /**
     * Return the profile information of the user login of undefined if not user is logged.
     *
     * @returns {string|undefined}
     */
    this.info = function(info) {
      if (angular.isDefined(info)) {
        Session.profile = info;
      }
      return Session.profile || undefined;
    };

    /**
     * Login by calling the Drupal REST server.
     *
     * @param url
     *   The Drupal URL
     * @param user
     *   Object with the properties "name" and "pass".
     * @param method
     *   The method of the login: "login" or "loginToken".
     *
     * @returns {*}
     */
    this.login = function(url, user, method) {
      return $http({
        method: 'GET',
        url: url + (method === 'login' ? '/api/login' : '/api/login-token'),
        withCredentials: method === 'login',
        headers: {
          'Authorization': 'Basic ' + Utils.Base64.encode(user.name + ':' + user.pass)
        }
      });
    };

  });
