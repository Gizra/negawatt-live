'use strict';

/**
 * Dashboard controller.
 */
angular.module('app')
  .controller('DashboardCtrl', function ($scope, Meter) {
    $scope.city = {
      'name': 'קרית גת',
      'lat': 31.603466403994243,
      'lng': 34.77099895477295,
      'zoom': 14
    };

    $scope.events = {};

    $scope.markerSelected = {};

    // Get list of meters.
    Meter.get().then(function (response) {
      $scope.city = response.data.city;
      $scope.meters = response.data.meters;
      $scope.status = response.data.status;
      $scope.totals = response.data.totals;
    });

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
      $scope.markerSelected = $scope.meters[args.markerName];
    });

  });
