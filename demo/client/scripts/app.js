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
      var routes;

      function setRoutes(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'views/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      }

      // Handle routes.
      routes = ['dashboard', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps', 'tables/static', 'tables/dynamic', 'tables/responsive', 'forms/elements', 'forms/layouts', 'forms/validation', 'forms/wizard', 'charts/charts', 'charts/flot', 'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/invoice', 'pages/signin', 'pages/signup', 'mail/compose', 'mail/inbox', 'mail/single', 'tasks/tasks'];

      routes.forEach(function(route) {
        return setRoutes(route);
      });

      $routeProvider.when('/', {
        redirectTo: '/dashboard'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).otherwise({
        redirectTo: '/404'
      });

      // Define interceptors.
      $httpProvider.interceptors.push(function ($q, $location, Session) {
        return {
          'request': function (config) {
            console.log('Session.token()', Session.token());
            if (Session.token()) {
              config.url += Session.token();
            }
            return config;
          },
          'response': function (result) {
            //console.log('response:', result);
            return result;
          },
          'responseError': function (rejection) {
            if (rejection.status === 401) {
              $location.url('pages/signin');
            }

            return $q.reject(rejection);
          }
        };
      });

      //// Use x-www-form-urlencoded Content-Type.
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    }
  );

