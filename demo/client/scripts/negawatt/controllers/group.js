'use strict';

angular.module('app')
  .controller('GroupCtrl', ['$scope', function($scope) {

    // Select last year report like default.
    $scope.pieChart = {};
    $scope.pieChart.data = [
      {
        label: "Health",
        data: 12
      }, {
        label: "Outdoor",
        data: 30
      }, {
        label: "Municipality",
        data: 20
      }, {
        label: "Welfare",
        data: 19
      }, {
        label: "Religious Services",
        data: 12
      }, {
        label: "Security",
        data: 30
      }, {
        label: "Sports",
        data: 20
      }, {
        label: "Organization",
        data: 50
      }, {
        label: "Water",
        data: 45
      }
    ];
    $scope.pieChart.options = {
      series: {
        pie: {
          show: true
        }
      },
      legend: {
        show: false
      },
      grid: {
        hoverable: false,
        clickable: true
      },
      clickable: true,
      colors: [
        '#5B90BF',
        '#A3BE8C',
        '#7FABD2',
        '#B48EAD',
        '#EBCB8B',
        '#BF616A',
        '#DCDCDC'
      ],
      tooltip: true,
      tooltipOpts: {
        content: "%p.0%, %s",
        defaultTheme: false
      }
    };

  }]);
