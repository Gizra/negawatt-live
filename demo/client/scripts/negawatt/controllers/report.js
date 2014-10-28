'use strict';

angular.module('app')
  .controller('AccountReportCtrl', [
    '$scope',
    'Chart',
    'Electricity',
    'Utils',
    function($scope, Chart, Electricity, Utils) {

    $scope.pieChart = Chart.mockPieChart();

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
          // Refresh the chart.
          $scope.$broadcast('report_change');
          console.log(response);
        });

    };

    // Select last year report like default.
    plotChart();

  }]);
