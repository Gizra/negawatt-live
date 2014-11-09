'use strict';

angular.module('app')
  .controller('MenuCtrl', ['$scope', 'Account', function($scope, Account) {

    // Select last year report like default.
    $scope.menus = {};

    // Load menus.
    Account.getGroups().then(function(response) {
      angular.extend($scope.menus, response.data.menus);
    });

  }]);
