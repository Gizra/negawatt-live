  'use strict';
  angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'easypiechart',
    'ui.tree',
    'ngMap',
    'ngTagsInput',
    'leaflet-directive',
    'app.controllers',
    'app.directives',
    'app.localization',
    'app.nav',
    'app.ui.ctrls',
    'app.ui.directives',
    'app.ui.services',
    'app.ui.map',
    'app.form.validation',
    'app.ui.form.ctrls',
    'app.ui.form.directives',
    'app.tables',
    'app.task',
    'app.chart.ctrls',
    'app.chart.directives',
    'app.page.ctrls',
    'angularMoment',
    'tc.chartjs'
  ]).config(
    function($routeProvider, $httpProvider) {
      var routes, setRoutes;

      // Handle routes.
      routes = ['dashboard', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps', 'tables/static', 'tables/dynamic', 'tables/responsive', 'forms/elements', 'forms/layouts', 'forms/validation', 'forms/wizard', 'charts/charts', 'charts/flot', 'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/invoice', 'pages/signin', 'pages/signup', 'mail/compose', 'mail/inbox', 'mail/single', 'tasks/tasks'];

      setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'views/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      };

      routes.forEach(function(route) {
        return setRoutes(route);
      });

      // Define interceptors.
      $httpProvider.interceptors.push(function ($q, $location) {
        return {
          'request': function (config) {
            console.log('request: ', config);
          },
          'response': function (result) {
            console.log('response:', result);
          },
          'responseError': function (rejection) {
            console.log('Failed with', rejection.status, 'status');
            if (rejection.status === 401) {
              $location.url('/login');
            }

            //return $q.reject(rejection);
          }
        };
      });

      $routeProvider.when('/', {
        redirectTo: '/dashboard'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).otherwise({
        redirectTo: '/404'
      });

      // Use x-www-form-urlencoded Content-Type.
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $httpProvider.defaults.headers.all['X-CSRF-Token'] = '306c0gXZbXSFtCd1ZdLlsu61LuonsBEeUExvr8Y2Fbo';



    }
  );

