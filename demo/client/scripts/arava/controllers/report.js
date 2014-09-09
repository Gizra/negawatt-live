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
      }
    };

    $scope.line1.data = [
      {
        label: 'Total Kwh.'
      },
      {
        label: 'Maximum Kwh.'
      },
      {
        label: 'Medium Kwh.'
      },
      {
        label: 'Low Kwh.'
      }
    ];

    // Get account (city) consumption information.
    Account.getReport().then(function(response) {
      // Update data.
      $scope.line1.data[0].data = response.data;

      // Refresh chart.
      $scope.$broadcast('report_change');

    });

  }]);
