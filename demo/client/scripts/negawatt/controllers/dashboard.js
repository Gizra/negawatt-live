'use strict';

/**
 * Dashboard controller.
 */
angular.module('app')
  .controller('DashboardCtrl', function ($scope, Account, Meter, Electricity) {
    var defaultAccount = {
      label: 'Kiriat Gat'
    };

    // Initialization need by the leaflet directive.
    $scope.center = {};
    $scope.events = {};

    // Get initial data from server.
    Account.getAccount(defaultAccount)
      .then(function(response) {
        $scope.account = response.data;

        // Center of the map, according the account.
        $scope.center = Account.getMapCenter($scope.account);

        Meter.get().then(function(response) {
          $scope.meters = response.data;

          if ($scope.meterSelected) {
            Electricity.get().then(function(response) {

            });
          }

        });

      });

    // Observers.
    $scope.$on('leafletDirectiveMarker.click', function(event, args){
      $scope.meterSelected = $scope.meters[args.markerName];
      $scope.$broadcast('negawatt.markerSelected', $scope.meterSelected);
    });

    $scope.$on('negawatt.account.loaded', function(event, account) {
      $scope.account = account;
    });

  });
