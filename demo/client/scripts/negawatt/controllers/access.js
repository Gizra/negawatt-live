'use strict';

angular.module('app')
  .controller('AccessCtrl', function($scope, Auth, Session, $location) {

    $scope.login = function(user) {
      Auth.login(user).then(function(response) {
        if (Session.info(response.data)) {
          $location.url('/');
        }
      }, function(response) {
        console.log('error:', response);
      });
    };

  });
