'use strict';

angular.module('aravaApp')
  .controller('DashboardCtrl', function ($scope, Places) {
  // Map geolocation default value.
  $scope.citySelected = {
    geolocation: {
      lat: 31.258,
      lng: 35.21,
      zoom: 7
    }
  };

  // Get places collection.
  $scope.places = Places;


});
