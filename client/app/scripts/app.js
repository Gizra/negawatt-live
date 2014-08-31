'use strict';

angular.module('aravaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'leaflet-directive'
])
  .config(function ($routeProvider, $httpProvider) {

    // Define routes.
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/dashboard-with', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


  });

