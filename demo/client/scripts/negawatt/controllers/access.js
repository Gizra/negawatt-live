'use strict';

angular.module('app')
  .controller('AccessCtrl', function($scope, Session, $location) {

    $scope.login = function(user) {
      Session.login(user).then(function(response) {
        if (Session.info(response.data)) {
          $location.url('/');
        }
      }, function(response) {
        console.log('error:', response);
      });
    };

  });
