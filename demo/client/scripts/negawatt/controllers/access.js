'use strict';

angular.module('app')
  .controller('AccessCtrl', function($scope, Auth, Session, $location, localStorageService) {

    $scope.login = function(user) {
      Auth.login(user).then(function(response) {
        localStorageService.set('access_token', response.data['access_token']);
        $location.url('/');
      });
    };

  });
