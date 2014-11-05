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
  .service('Session', function (Utils) {
    var Session = this;

    /**
     * Return the profile information of the user login of undefined if not user is logged.
     *
     * @returns {string|undefined}
     */
    this.info = function(info) {
      if (angular.isDefined(info)) {
        Session.profile = (Session.profile) ? angular.extend(Session.profile, info) : info;
      }
      return Session.profile || undefined;
    };

    /**
     * Return the access token. in the
     *
     * @returns {*}
     */
    this.token = function() {
      return (Session.profile) ? Utils.createQueryString(Session.profile.access_token, 'token') : undefined;
    };



  });
