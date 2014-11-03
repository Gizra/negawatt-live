'use strict';

/**
 * Dashboard controller.
 */
angular.module('app')
  .controller('DashboardCtrl', function ($scope, Account, Meter, Electricity) {
    var defaultAccount = {
      label: 'Kiriat Gat'
    };

    $scope.account = {};
    $scope.events =  {};

    // Get initial data from server.
    Account.getAccount(defaultAccount)
      .then(function(response) {
        $scope.account = response.data;

        Meter.get().then(function(response) {
          $scope.meters = response.data;

          Electricity.get().then(function(response) {

          });

        });

      });


    // Get list of meters.
    //Meter.get().then(function (response) {
    //
    //  console.log(response);
    //
    //  $scope.account = response.data.account;
    //
    //  $scope.meters = response.data.meters;
    //
    //  $scope.status = response.data.status;
    //
    //  $scope.totals = response.data.totals;
    //});

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
      $scope.meterSelected = $scope.meters[args.markerName];
      $scope.$broadcast('negawatt.markerSelected', $scope.meterSelected);
    });

    $scope.$on('negawatt.account.loaded', function(event, account) {
      $scope.account = account;
    });

  });
