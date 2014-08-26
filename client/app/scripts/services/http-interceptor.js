'use strict';

angular.module('aravaApp')
  .factory('AravaHttpInterceptor', function ($q, BACKEND_URL) {
    // Public API here
    return {
      /**
       * This interceptor construct the path to get the data translated,
       * check the config and according this generated the new path in relation
       * the language selected by the user.
       *
       * @param config
       *   In the $http config add two new variables:
       *
       *   - serverPredefined: true|false if the value is true take the constant
       *     WEB_URL defined in the config.js to set the server URI. Otherwise
       *     keep the original config.url.
       *
       * @returns {*}
       */
      'request': function(config) {
        // Validate if use the server url defined in the constant.
        if (config.serverPredefined) {
          config._url = BACKEND_URL;

          // Have the condition to work with the module angular-apimock
          // https://github.com/seriema/angular-apimock
          config.url = (angular.isDefined(config.apiMock) && config.apiMock) ? config.url : config._url + config.url;
        }

        return config || $q.when(config);
      }
    };
  });
