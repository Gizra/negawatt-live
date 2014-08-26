'use strict';

angular.module('aravaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'apiMock',
  'leaflet-directive'
])
  .config(function ($routeProvider, $httpProvider, httpInterceptorProvider) {
    // Add interceptors.
    $httpProvider.interceptors.push('AravaHttpInterceptor');

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
      .otherwise({
        redirectTo: '/'
      });

      // Add configuration of the apiMock.
    httpInterceptorProvider.config({
      mockDataPath: '/mock_data/',
      apiPath: '/'
    });
  });

