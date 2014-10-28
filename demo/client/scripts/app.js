(function() {
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
    'angularMoment'
  ]).config([
    '$routeProvider',
    '$httpProvider',
    function($routeProvider, $httpProvider) {
      var routes, setRoutes;
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
      return $routeProvider.when('/', {
        redirectTo: '/dashboard'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).otherwise({
        redirectTo: '/404'
      });

      // Use x-www-form-urlencoded Content-Type
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
          value = obj[name];

          if(value instanceof Array) {
            for(i=0; i<value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object) {
            for(subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      // Override $http service's default transformRequest
      $httpProvider.defaults.transformRequest = [function(data) {
        var result = angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        return result;
      }];
    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map
