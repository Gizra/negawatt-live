'use strict';

angular.module('app')
  .controller('AccountReportCtrl', ['$scope', 'Account', 'Chart', function($scope, Account, Chart) {
    // Private functions.
    /**
     * Set type report into scope property and handle ng-class options.
     *
     * @param type
     *   string indicating the type of report ('current'. 'lastWeek', 'lastMonth', 'lastYear')
     */
    function setReport(type) {
      $scope.selected = {};
      $scope.typeReport = type;

      switch (type) {
        case 'current':
          $scope.selected.current = {'selected': true };
          break;
        case 'lastWeek':
          $scope.selected.lastWeek = {'selected': true };
          break;
        case 'lastMonth':
          $scope.selected.lastMonth = {'selected': true };
          break;
        case 'lastYear':
          $scope.selected.lastYear = {'selected': true };
          break;
      }
    }

    $scope.line1 = {};
//    $scope.line1.options = ;
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

    $scope.selectReport = function(type) {

      // Set selection of type report.
      setReport(type);

      // Update x axis labels.
//      $scope.line1.options.xaxis = Chart.options(type).axis;
      $scope.line1.options = Chart.options(type);

      // Get account (city) consumption information.
      Account.getReport(type).then(function(response) {
        // Update data.
        $scope.line1.data[0].data = response.data;

        // Refresh chart.
        $scope.$broadcast('report_change');

      });
    };

    // Select last year report like default.
    $scope.selectReport('lastYear');

  }]);
