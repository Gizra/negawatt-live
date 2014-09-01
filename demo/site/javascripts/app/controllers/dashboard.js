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


  angular.extend($scope, {
    arad: {
      lat: 31.258,
      lng: 35.21,
      zoom: 15
    },
    markers: {
      marker1: {
        lat: 31.258,
        lng: 35.214,
        focus: false,
        message: "יסודי יעלים-עופרים",
        title: "יסודי יעלים-עופרים",
        draggable: false
      },
      marker2: {
        lat: 31.261,
        lng: 35.215,
        focus: false,
        message: "מקיף אורט ערד",
        title: "מקיף אורט ערד",
        draggable: false
      },
      marker3: {
        lat: 31.255,
        lng: 35.207,
        focus: false,
        message: "יסודי אבישור",
        title: "יסודי אבישור",
        draggable: false
      },
      marker4: {
        lat: 31.26,
        lng: 35.203,
        focus: false,
        message: "ממלכתי חלמיש",
        title: "ממלכתי חלמיש",
        draggable: false
      },
      marker5: {
        lat: 31.249,
        lng: 35.217,
        focus: false,
        message: "אולפנת בני עקיבא",
        title: "אולפנת בני עקיבא",
        draggable: false
      }
    }
  });


  // Get places collection.
  $scope.places = Places;


});
