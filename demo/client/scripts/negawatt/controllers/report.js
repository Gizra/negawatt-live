'use strict';

angular.module('app')
  .controller('AccountReportCtrl', function($scope, ChartLine, ChartPie, Electricity, Utils) {

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

        });

    }

    $scope.$on('negawatt.markerSelected', function(event, meterSelected) {
      $scope.meterSelected = meterSelected;

      $scope.pie = ChartPie.mockPieChart();

      // Select last year report like default.
      plotChart($scope.meterSelected.id);
    });

  });
