'use strict';

angular.module('app')
  .controller('MenuCtrl', ['$scope', function($scope) {

    // Select last year report like default.
    $scope.menus = [
      {
        name:'Health',
        url: '#/detail/group'
      },
      {
        name:'Outdoor',
        url: '#/detail/blank'
      },
      {
        name:'Municipality',
        url: '#/detail/blank'
      },
      {
        name:'Welfare',
        url: '#/detail/blank'
      },
      {
        name:'Religious service',
        url: '#/detail/blank'
      },
      {
        name:'Security',
        url: '#/detail/blank'
      },
      {
        name:'Sports',
        url: '#/detail/blank'
      },
      {
        name:'Organization',
        url: '#/detail/blank'
      },
      {
        name:'Water',
        url: '#/detail/blank'
      }
    ];

  }]);
