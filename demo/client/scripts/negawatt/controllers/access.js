'use strict';

angular.module('app')
  .controller('AccessCtrl', function($scope, Auth, $location) {

    $scope.login = function(user) {
      Auth.login(user).then(function() {
        $location.url('/');
      });
    };

  });
