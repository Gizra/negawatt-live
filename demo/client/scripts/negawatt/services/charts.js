'use strict';

angular.module('app')
  .service('Chart', function ($q) {
    var Chart = this;
    var colors = {
      primary: '#5B90BF',
      success: '#A3BE8C',
      info: '#7FABD2',
      infoAlt: '#B48EAD',
      warning: '#EBCB8B',
      danger: '#BF616A',
      gray: '#DCDCDC'
    };

    var basicOptions = {
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
      colors: [colors.danger, colors.warning, colors.info, colors.success],
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

    /**
     * Return options for type of reports.
     *
     * @returns {*}
     */
    this.options = function(type) {
      var options = {};

      switch (type) {
        case 'lastYear':
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
        case 'lastMonth':
          options.axis = {
            ticks: [
              [1, 'week 1'],
              [2, 'week 2'],
              [3, 'week 3'],
              [4, 'week 4']
            ]
          };
          break;
        case 'lastWeek':
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

      return angular.extend(options, basicOptions);
    };


    /**
     * Return object expected by the pieChart component.
     *
     * @returns {*} - data object.
     */
    this.mockPieChart = function() {
      
      // Define basic configuration.
      var mock = {
        data: [],
        options: {
          series: {
            pie: {
              show: true
            }
          },
          legend: {
            show: true
          },
          grid: {
            hoverable: true,
            clickable: true
          },
          colors: [
            colors.primary,
            colors.success,
            colors.info,
            colors.warning,
            colors.danger
          ],
          tooltip: true,
          tooltipOpts: {
            content: "%p.0%, %s",
            defaultTheme: false
          }
        }
      };

      // Set demo data
      mock.data = [
        {
          label: "תאורת חוץ",
          data: 3126998
        }, {
          label: "חינוך",
          data: 2852161
        }, {
          label: "עיריה",
          data: 646544
        }, {
          label: "רווחה",
          data: 312385
        }, {
          label: "שרותי דת",
          data: 161725
        }, {
          label: "בריאות",
          data: 79081
        }, {
          label: "בטחון",
          data: 71611
        }, {
          label: "ספורט",
          data: 46440
        }, {
          label: "עמותה",
          data: 26378
        }
      ];

      //
      mock.options = {
        series: {
          pie: {
            show: true
          }
        },
        legend: {
          show: true
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: [
          colors.primary,
          colors.success,
          colors.info,
          colors.warning,
          colors.danger
        ],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
            
      return mock;
    }

    /**
     * Get the response data from the service electricity via controller report.
     *
     * @param {*} - response
     * @returns {$q.promise}
     */
    this.getLineChart = function(response) {
      var deferred = $q.defer();

      //function chartData() {
      //  return [
      //    [1, response.data.data.kwh]
      //  ]
      ////}

      // Define basic label confifuration.
      //chart = {
      //  line1: {
      //    data: [
      //      {
      //        label: 'תעריף שיא',
      //        data: chartData
      //      }
      //    ]
      //  }
      //};

      //// Update x axis labels.
      //$scope.line1;
      //
      ////Update y axis data.
      var data = {
        data: [
          [1,125],
          [2,345],
          [3,245],
          [4,658],
          [5,659],
          [6,125],
          [7,345],
          [8,245],
          [9,658],
          [10,659],
          [11,659],
          [12,659]
        ]
      };

      //
      //data: [
      //  {
      //    label: 'תעריף שיא'
      //  },
      //  {
      //    label: 'תעריף גבע'
      //  },
      //  {
      //    label: 'תעריף שפל'
      //  },
      //  {
      //    label: 'ללא תעו״ז'
      //  }
      //]
      //
      //// Update detailed.
      //$scope.line1.data[1].data = response.data.medium;
      //$scope.line1.data[2].data = response.data.low;
      //$scope.line1.data[3].data = response.data.fixed;

      deferred.resolve(data);
      return deferred.promise;
    }

  });
