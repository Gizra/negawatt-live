(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'Arava ECT - Gizra POC',
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
  ]).controller('DashboardCtrl', ['$scope', function($scope) {
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
  }]);

}).call(this);

//# sourceMappingURL=main.js.map
