'use strict';

angular.module('app')
  .controller('MenuCtrl', ['$scope', 'Account', function($scope, Account) {

    // Select last year report like default.
    $scope.categories = {};

    // Load menus.
    Account.getCategories().then(function(response) {
      $scope.categories = response.data.data;
    });

  }]);
