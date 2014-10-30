/**
 * Created by gizra on 10/28/14.
 *
 * Service for functionality used accross the application.
 */
'use strict';

angular.module('app')
  .factory('Utils', function ($q, $http, BACKEND_URL) {

    /**
     * Return query string for restful module. (Drupal 7.0)
     *
     * @param {*} - object with filters, where the key is the name of the field to
     * filter the response, equal the value.
     *
     *  {
     *    key: value,
     *    ...
     *  }
     *
     * @returns {string} - in the format ?filter[key]=value[&filter[key]=value...]
     */
    this.createQueryString = function(filters) {
      var queryString;

      angular.forEach(filters, function(value, key) {
        queryString = ((angular.isUndefined(queryString)) ? '?' : queryString + '&') + 'filter[' + key + ']=' + value;
      }, queryString);

      return queryString
    };

    return this;
  });
