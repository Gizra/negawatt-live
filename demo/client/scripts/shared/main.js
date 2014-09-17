(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'NegaWatt - POC',
        name: 'Erad'
      };
      $scope.pageTransitionOpts = [
        {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }, {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'vertical',
        fixedHeader: true,
        fixedSidebar: true,
        pageTransition: $scope.pageTransitionOpts[0],
        skin: '11'
      };

      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);

      // Listener event click of piechart.
      $scope.$on('piechart_clicked', function(events, args) {
        console.log(args.serieClicked);
      });

      return $scope.color = {
        primary: '#5B90BF',
        success: '#A3BE8C',
        info: '#7FABD2',
        infoAlt: '#B48EAD',
        warning: '#EBCB8B',
        danger: '#BF616A',
        gray: '#DCDCDC'
      };
    }
  ]).controller('HeaderCtrl', ['$scope', function($scope) {}]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ])
  /**
   * Dashboard controller.
   */
  .controller('DashboardCtrl', ['$scope', 'Counter', function($scope, Counter) {
      $scope.city = {
        "name": 'קרית גת',
        "lat": 31.603466403994243,
        "lng": 34.770998954772950,
        "zoom": 12
      };

      $scope.counters = {};
      $scope.status = {};
      $scope.totals = {};

    // Get list of counters.
    Counter.get().then(function(response) {
      angular.extend($scope.city, response.data.city);
      $scope.city.zoom = 13;

      angular.extend($scope.counters, response.data.counters);
      angular.extend($scope.status, response.data.status);
      angular.extend($scope.totals, response.data.totals);
    });

  }]);

}).call(this);

//# sourceMappingURL=main.js.map
