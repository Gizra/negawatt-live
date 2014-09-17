(function() {
  'use strict';
  angular.module('app.chart.directives', []).directive('flotChart', ['$rootScope',
    function($rootScope) {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data,
            options,
            plot,
            chart;

          data = scope.data;
          options = scope.options;

          /**
           * Binding events according the type of element.
           *
           * @param type
           */
          function bindingEvents(type) {
            var label;

            switch (type) {
              case 'pieChart':
                ele.bind('plotclick', function(events, pos, item){
                  if (item) {
                    label = plot.getData()[item.seriesIndex].label;
                    $rootScope.$broadcast('piechart_clicked', {serieClicked: label, id: item.seriesIndex});
                  }
                });
                break;
            }

          }

          // Refresh report with new data.
          scope.$on('report_change', function(events, args) {
            chart = events.targetScope[args.chart];
            if (ele.data().name === args.chart) {
              plot = $.plot(ele[0], chart.data, chart.options);
            }

            bindingEvents(args.chart);
          });

          return plot;
        }
      };
    }
  ]).directive('flotChartRealtime', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var data, getRandomData, plot, totalPoints, update, updateInterval;
          data = [];
          totalPoints = 300;
          getRandomData = function() {
            var i, prev, res, y;
            if (data.length > 0) {
              data = data.slice(1);
            }
            while (data.length < totalPoints) {
              prev = (data.length > 0 ? data[data.length - 1] : 50);
              y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else {
                if (y > 100) {
                  y = 100;
                }
              }
              data.push(y);
            }
            res = [];
            i = 0;
            while (i < data.length) {
              res.push([i, data[i]]);
              ++i;
            }
            return res;
          };
          update = function() {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);
          };
          data = [];
          totalPoints = 300;
          updateInterval = 200;
          plot = $.plot(ele[0], [getRandomData()], {
            series: {
              lines: {
                show: true,
                fill: true
              },
              shadowSize: 0
            },
            yaxis: {
              min: 0,
              max: 100
            },
            xaxis: {
              show: false
            },
            grid: {
              hoverable: true,
              borderWidth: 1,
              borderColor: '#eeeeee'
            },
            colors: ["#5B90BF"]
          });
          return update();
        }
      };
    }
  ]).directive('sparkline', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, sparkResize, sparklineDraw;
          data = scope.data;
          options = scope.options;
          sparkResize = void 0;
          sparklineDraw = function() {
            return ele.sparkline(data, options);
          };
          $(window).resize(function(e) {
            clearTimeout(sparkResize);
            return sparkResize = setTimeout(sparklineDraw, 200);
          });
          return sparklineDraw();
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=ChartDirective.js.map
