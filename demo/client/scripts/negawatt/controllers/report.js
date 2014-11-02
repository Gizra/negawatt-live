'use strict';

angular.module('app')
  .controller('AccountReportCtrl', function($scope, ChartLine, ChartPie, Electricity, Utils) {

    $scope.pie = ChartPie.mockPieChart();

    /**
     * Get the chart data and plot.
     */
    function plotChart(meterSelected) {
      var filters = {
        meter: meterSelected,
        type: 'month'
      };

      // Get chart data object.
      Electricity.get(Utils.createQueryString(filters))
        .then(ChartLine.getLineChart)
        .then(function(response) {
          $scope.line = {
            data: response.data,
            options: response.options
          };

          console.log($scope.line);
        });

    }

    // Select last year report like default.
    if ($scope.meterSelected) {
      plotChart($scope.meterSelected.id);
    }

  });
