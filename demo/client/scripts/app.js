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
    '$routeProvider', function($routeProvider) {
      var routes, setRoutes;
      routes = [
        'dashboard',
        'detail/blank',
        'detail/group/:id'
      ];
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
    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map
