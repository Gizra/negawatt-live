'use strict';

angular.module('aravaApp')
  .provider('Places', function Places() {

    this.$get = function($http) {
      var places;

      // Private functions.
      /**
       * Get all places from the server.
       *
       * @returns {*}
       * @private
       */
      function gettingPlaces() {
        return $http({
          method: 'GET',
          url: '/places',
          serverPredefined: true,
          apiMock: true
        });
      }

      /**
       * Define Places model.
       *
       * @constructor
       */
      function Places() {}

      /**
       * Unwrap data into the object.
       *
       * @private
       */
      Places.prototype._unwrap = function() {
        return gettingPlaces().success(function(response) {
          Places.prototype._data = response.places;
        });
      };

      // Unwrap the collection data in the object instantiation.
      places = new Places();
      places._unwrap().then(function() {
        angular.extend(places, places._data);
      });

      return places;
    };

  });
