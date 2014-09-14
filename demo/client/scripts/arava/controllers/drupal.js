'use strict';

angular.module('app')
  .service('Drupal', function($window) {
    var self = this;

    /**
     * Wraps inside angularjs Drupal settings global object.
     *
     * @type {Drupal.settings}
     */
    this.settings = $window.Drupal.settings;

    /**
     * Return user object if it authenticated.
     *
     * @returns {*}
     *
     *  {
     *    csrfToken: string,
     *    email: string,
     *    firstname: string,
     *    fullname: string,
     *    lastname: string,
     *    name: string,
     *    picture: string,
     *    uid: string
     *  }
     *
     * @param fields (array)
     *   Array with the properties names, will returned in user object. example: ['name', 'email']
     * @returns {*}
     */
    this.getUser = function(fields) {

      if (angular.isUndefined(self.settings.ethosia) || angular.isUndefined(self.settings.ethosia.user)) {
        return undefined;
      }

      if (angular.isDefined(fields)) {
        var user = {};

        angular.forEach(fields, function(field) {
          this[field] = self.settings.ethosia.user[field];
        }, user);
        return user;
      }

      return self.settings.ethosia.user;
    };

    /**
     * Return the full backend url from drupal.
     *
     * @returns string
     */
    this.getBasePath = function() {
      return (angular.isDefined(self.settings.ethosia.base_path)) ? self.settings.ethosia.base_path : undefined;
    };

    /**
     * Return the full backend search url from drupal.
     *
     * @returns string
     */
    this.getSearchPath = function() {
      return (angular.isDefined(self.settings.ethosia.search.path)) ? self.settings.ethosia.search.path : 'search';
    };

    /**
     * Return the full backend search url from drupal.
     *
     * @returns []
     */
    this.getSmartAgentsFrecuencies = function() {
      return (angular.isDefined(self.settings.ethosia.smart_agent.fields.frequency)) ? self.settings.ethosia.smart_agent.fields.frequency : undefined;
    };
  });