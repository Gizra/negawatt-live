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

    var gettingAccount = Account.getAccount(defaultAccount);
    //var gettingMeters = Meter.get();
    //var gettingElectricity = Electricity.get();

    gettingAccount.then(function(response) {
      $scope.account = response.data;
      $scope.events =  {};
      $scope.markerSelected = {};
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

  });
