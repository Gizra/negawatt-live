'use strict';

angular.module('app')
  .controller('DashboardAravaCtrl', function ($scope, Account, Counter) {
  var selection;

  // Map geolocation default value.
  $scope.citySelected = {
    geolocation: {
      lat: 31.258,
      lng: 35.21,
      zoom: 7
    }
  };

  // DEMO HARDCODE - Set markers.
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
        message: 'יסודי יעלים-עופרים',
        title: 'יסודי יעלים-עופרים',
        draggable: false
      },
      marker2: {
        lat: 31.261,
        lng: 35.215,
        focus: false,
        message: 'מקיף אורט ערד',
        title: 'מקיף אורט ערד',
        draggable: false
      },
      marker3: {
        lat: 31.255,
        lng: 35.207,
        focus: false,
        message: 'יסודי אבישור',
        title: 'יסודי אבישור',
        draggable: false
      },
      marker4: {
        lat: 31.26,
        lng: 35.203,
        focus: false,
        message: 'ממלכתי חלמיש',
        title: 'ממלכתי חלמיש',
        draggable: false
      },
      marker5: {
        lat: 31.249,
        lng: 35.217,
        focus: false,
        message: 'אולפנת בני עקיבא',
        title: 'אולפנת בני עקיבא',
        draggable: false
      }
    }
  });

  // Get list of counters.
  Counter.get().then(function(response) {
    $scope.counters = {
      list: response.data.counters,
      totals: response.data.totals
    };
  });

  selection = {
    start: '201401',
    end: '201407'
  };

  // Get account (city) consumption information.
  Account.get(selection).then(function(response) {
    $scope.account = angular.extend(selection, response.data);
  });

  $scope.$watch('counters', function(counters) {
    if (counters) {
      console.log('COUNTERS:', counters);
    }
  });

  $scope.$watch('account', function(account) {
    if (account) {
      console.log('ACCOUNT:', account);
    }
  });



  });
