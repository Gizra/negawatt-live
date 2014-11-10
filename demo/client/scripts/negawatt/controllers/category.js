'use strict';

angular.module('app')
  .controller('CategoryCtrl', function($scope, Account, $rootScope) {

    // Select last year report like default.
    $scope.categories = {};

    // Load Categories.
    Account.getCategories().then(function(response) {
      $scope.categories = response.data.data;
    });

    // Filter map markers by id.
    $scope.filterBy = function(id) {
      // Sent the event to all the application.
      $rootScope.$broadcast('negawatt.category.filterBy', id);
    };

  });
