'use strict';

angular.module('aravaApp')
  .factory('Place', function () {

    // Define Methods of the model.
    var methods = {
      getMarkers: function (cityId) {
        return angular.noop();
      }
    };

    function Place(data) {
      angular.extend(this, data);
    }
    angular.extend(Place.prototype, methods);

    // Public API here
    return Place;
  });
