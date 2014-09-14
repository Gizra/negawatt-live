'use strict';

angular.module('ehApp')
  .service('userProfile', function($http, $q, User, storage, $rootScope, Drupal) {
    var userProfile = this;

    /**
     *  User profile object.
     *
     *  when the user is logged the property have an object like this..
     *  {
     *    "firstname": "joe",
     *    "lastname": "dow",
     *    "uid": "1",
     *    "name": "joe",
     *    "fullname": "joe dow",
     *    "email": "jdow@example.com",
     *    "picture": "http://localhost/ethosia/www/sites/default/files/joedow.jpg",
     *    "csrfToken": "SX9nP8UJf1CqHKrPfB9nHioqsdSsVFefZXWViSoBLTg"
     *  }
     */
    this.info;

    /**
     * Extend basic user info, with job saved, photo, etc.
     *
     * @param id
     *  The user ID.
     */
    function extendProfile(id) {
      return $http({
        method: 'GET',
        url: 'api/v1/users/' + id,
        withCredentials: true,
        headers: {
          'X-Restful-Minor-Version': 1
        },
        serverPredefined: true
      }).success(function(data) {
        angular.extend(userProfile.info, data);
        userProfile.info.loggedClient = true;

        $rootScope.$broadcast('profile_updated');
      });
    }

    /**
     * Refresh the new value of the Drupal token in the userProfile.
     * @returns {*}
     */
    function refreshToken() {
      var token;

      if (userProfile.isLogged()) {
        token = userProfile.info['X-CSRF-Token'];
      }
      else {
        token = Drupal.getUser().csrfToken;;
      }

      return token;
    }

    this.updateXCsrfToken = function() {
      var token = refreshToken();

      $http.defaults.headers.post['X-CSRF-Token'] = token;
      $http.defaults.headers.patch['X-CSRF-Token'] = token;
      $http.defaults.headers.put['X-CSRF-Token'] = token;
    };

    /**
     * Return true if the user it's already logged.
     *
     * @returns {boolean}
     */
    this.isLogged = function() {
      return (angular.isDefined(userProfile.info) && userProfile.info !== null) ? true : false;
    };

    /**
     * Check the server side (Drupal) login and set profile info.
     *
     * @param fromClient
     *  true if login was did from the client side.
     */
    this.synchronizeLogin = function(fromClient) {

      if (fromClient) {
        // Update profile event inside the function.
        extendProfile(userProfile.info.id);
      }
      else {
        // logged in server side.
        if (angular.element('body').hasClass('logged-in')) {
          userProfile.info = Drupal.getUser();
          $rootScope.$broadcast('profile_updated');
        }

        // Not logged in drupal.
        if (angular.element('body').hasClass('not-logged-in')) {
          userProfile.clear();
        }
      }

    };

    /**
     * Clear user profile.
     */
    this.clear = function() {
      storage.remove('profile');
      userProfile.info = undefined;
    };

    /**
     * Logout user.
     *
     * @returns {*}
     */
    this.logout = function() {
      return $http({
        url: '/user/logout',
        withCredentials: true,
        serverPredefined: true
      }).success(function(data) {
        userProfile.clear();
      });
    };
  });