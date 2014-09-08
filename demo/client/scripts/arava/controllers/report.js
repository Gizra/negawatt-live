'use strict';

angular.module('app')
  .controller('AccountReportCtrl', ['$scope', 'Account', function($scope, Account) {
    $scope.line1 = {};
    $scope.line1.options = {
      series: {
        lines: {
          show: true,
          fill: true,
          fillColor: {
            colors: [
              {
                opacity: 0
              },
              {
                opacity: 0.3
              }
            ]
          }
        },
        points: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: "#ffffff",
          symbol: "circle",
          radius: 5
        }
      },
      colors: [$scope.color.primary, $scope.color.infoAlt],
      tooltip: true,
      tooltipOpts: {
        defaultTheme: false
      },
      grid: {
        hoverable: true,
        clickable: true,
        tickColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#eeeeee"
      },
      xaxis: {
        ticks: [
          [1, 'Jan.'],
          [2, 'Feb.'],
          [3, 'Mar.'],
          [4, 'Apr.'],
          [5, 'May'],
          [6, 'June'],
          [7, 'July'],
          [8, 'Aug.'],
          [9, 'Sept.'],
          [10, 'Oct.'],
          [11, 'Nov.'],
          [12, 'Dec.']
        ]
      }
    };

    $scope.line1.data = [
      {
        data: [ ],
        label: 'Trend'
      }
    ];

    // Get account (city) consumption information.
    Account.getReport().then(function(response) {
      console.log(response.data1);

      // Update data.
      $scope.line1.data[0].data = response.data1;

      // Refresh chart.
      $scope.$broadcast('refresh_report');
      console.log($scope.line1.data[0].data)

    });

  }]);
