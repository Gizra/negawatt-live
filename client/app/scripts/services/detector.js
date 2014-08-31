'use strict';

  angular.module('aravaApp')
  .service('Detector', function Detector($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = {};

    /**
     * Get all the detectors.
     */
    this.getDetectors = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'detectors.json',
        serverPredefined: true
      }).success(function(detectors) {
          data.detectors = detectors;

          deferred.resolve(data.detectors);
        });

      // Return object.
      return deferred.promise;
    }

    /**
     * Add new detector.
     *
     * @param detector {*}
     *
     * Example detector object:
     * {
     *    id:47,
     *    name: 'dummy detector',
     *    totalKw: 2573119,
     *    saved: 3500,
     *    lastMonthKw: 6568,
     *    record: {
     *      week: {
     *        1397041991912: {
     *          totalKw: 973101
     *        },
     *        1397041991910: {
     *          "totalKw": 973057
     *        }
     *      },
     *      month: {
     *        1397041991912: {
     *          totalKw: 973101
     *        },
     *        1397041991910: {
     *          totalKw: 973057
     *        }
     *      },
     *      year: {
     *        weekly: {
     *          1397041991913: {
     *            totalKw: 973101
     *          },
     *          1397041991910: {
     *            totalKw: 973057
     *          },
     *          1397041991912: {
     *            totalKw: 973000
     *          }
     *        },
     *        monthly: {
     *          1397041991914: {
     *            totalKw: 973101
     *          },
     *          1397041991910: {
     *            totalKw: 973057
     *          },
     *          1397041991915: {
     *            totalKw: 973000
     *          }
     *        }
     *      }
     *    }
     *
     */
    this.addDetector = function(detector) {
      $http({
        method: 'POST',
        url: 'detectors.json',
        serverPredefined: true,
        data: detector
      }).success(function(response) {
          console.log(data.detectors);
          data.detectors.push(detector);
          // Return object.
          console.log(response);
        });
    }

  });
