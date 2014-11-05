'use strict';

angular.module('app')
  .controller('AccessCtrl', function($scope, Session) {

    $scope.login = function(user) {
      console.log(user);
    };

  });
