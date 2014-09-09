'use strict';

angular.module('app')
  .service('Counter', function ($q, $http, BACKEND_URL) {

    /**
     * Return options for type of reports.
     *
     * @returns {*}
     */
    this.options = function(type) {
      var options = {};

      switch (type) {
        case 'lineLastYear':
          options.axis = {
            ticks: [
              [1, 'Jan'],
              [2, 'Feb'],
              [3, 'Mar'],
              [4, 'Apr'],
              [5, 'May'],
              [6, 'Jun'],
              [7, 'Jul'],
              [8, 'Aug'],
              [9, 'Sep'],
              [10, 'Oct'],
              [11, 'Nov'],
              [12, 'Dec']
            ]
          };
          break;
        case 'lineLastMonth':
          options.axis = {
            ticks: [
              [1, 'week 1'],
              [2, 'week 2'],
              [3, 'week 3'],
              [4, 'week 4']
            ]
          };
          break;
        case 'lineLastWeek':
          options.axis = {
            ticks: [
              [1, 'Sunday'],
              [2, 'Monday'],
              [3, 'Tuesday'],
              [4, 'Wednesday'],
              [5, 'Thursday'],
              [6, 'Friday'],
              [7, 'Saturday']
            ]
          };
          break;
      }

      return options;
    };

  });