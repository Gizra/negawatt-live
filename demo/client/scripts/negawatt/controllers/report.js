'use strict';

angular.module('app')
  .controller('AccountReportCtrl', function($scope, ChartLine, Electricity, Utils) {
    //$scope.pieChart = Chart.mockPieChart();
    //$scope.line = {
    //  data: []
    //};

    /**
     * Get the chart data and plot.
     */
    function plotChart() {
      var filters = {
        meter: 258,
        type: 'month'
      };

      // Get chart data object.
      Electricity.get(Utils.createQueryString(filters))
        .then(ChartLine.getLineChart)
        .then(function(response) {
          $scope.data = response.data;
          $scope.options = response.options;

          console.log($scope.line, $scope.options );
        });

    };

    // Select last year report like default.
    plotChart();

  });
