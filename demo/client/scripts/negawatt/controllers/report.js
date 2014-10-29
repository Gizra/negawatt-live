'use strict';

angular.module('app')
  .controller('AccountReportCtrl', [
    '$scope',
    'Chart',
    'Electricity',
    'Utils',
    function($scope, Chart, Electricity, Utils) {

    $scope.pieChart = Chart.mockPieChart();
    $scope.line = {
      data: []
    };

    /**
     * Get the chart data and plot.
     */
    function plotChart() {
      var filters = {
        meter: 257,
        type: 'month'
      };

      // Get chart data object.
      Electricity.get(Utils.createQueryString(filters))
        .then(Chart.getLineChart)
        .then(function(response) {
          $scope.data = response.data;
          $scope.options = response.options;

          console.log($scope.line, $scope.options );
        });

    };

    // Select last year report like default.
    plotChart();

  }]);
