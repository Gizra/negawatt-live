'use strict';

angular.module('app')
  .controller('MenuCtrl', function($scope, Account, $rootScope) {

    // Select last year report like default.
    $scope.categories = {};

    // Load menus.
    Account.getCategories().then(function(response) {
      $scope.categories = response.data.data;
    });

    // Filter map markers by id.
    $scope.filterBy = function(id) {
      // Sent the event to all the application.
      $rootScope.$broadcast('negawatt.menu.filterBy', id);
    };

  });
