'use strict';

angular.module('app')
  .controller('LoginCtrl', function($scope, User, userProfile, Drupal) {
    // Refresh user information.
    function refresh() {
      $scope.userLogged = userProfile.isLogged;
      $scope.user = userProfile.info;
    }

    /**
     * Login in an user with username and password.
     *
     * @param userCredentials
     */
    this.login = function(userCredentials) {

      // Set authentication endpoint.
      var url = Drupal.getBasePath() + '/api/login';

      // Validations.
      if (angular.isUndefined(userCredentials)) {
        $scope.formUser.message = 'Please write email and password.';
        return;
      }

      User.login(url, userCredentials)
        .then(function(data) {
          $scope.formUser = {};
        }, function() {
          $scope.formUser.password = '';
          $scope.formUser.message = 'email or password are incorrect.';

          $scope.user = userProfile.info;
        });
    };

    /**
     * Logout the user.
     */
    this.logout = function() {
      userProfile.logout().then(function() {
        // Implement with out reload the page.
        // $window.location = Drupal.getBasePath();
      });
    };

    /**
     * Recovery the user password from email address.
     *
     * @param email
     */
    this.forgotPassword = function(email) {
      // Set authentication endpoint.
      var url = Drupal.getBasePath() + '/api/v1/forgot_password',
        data = { email: email },
        message;

      User.forgotPassword(url, data)
        .then(function() {
          $scope.formUser.message = 'the instruction to recovery the password have been sent to your email address.';
        }, function() {
          $scope.formUser.message = 'email address entered could not found';
        });
    };

    /**
     * Update user profile information after the service it's updated.
     */
    $scope.$on('profile_updated', function() {
      refresh();
    });

    refresh();
    angular.extend($scope, this);

  });