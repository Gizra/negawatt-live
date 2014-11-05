'use strict';

angular.module('app')
  .controller('AccessCtrl', function($scope, Session) {

    $scope.login = function(user) {
      Session.login(user.username, user.password, 'login-token').then(function(response) {
        console.log(response);
      });
    };

  });
