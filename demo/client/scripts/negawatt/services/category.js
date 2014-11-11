'use strict';

angular.module('app')
  .service('Category', function ($http, $q, BACKEND_URL, $filter, Utils) {
    var Category = this;

    /**
     * Add property to apply the menu style.
     *
     * @param data
     * @returns {*}
     */
    function addStyle(data) {
      data = JSON.parse(data);
      // If the response status is different to 200 the data property is not defined.
      if (angular.isUndefined(data.data)) {
        return;
      }

      var items = data.data;

      angular.forEach(items, function(item) {
        item.style = '{\'margin-right\': \'' + item.depth * 20 + 'px\'}';
      });

      return data;
    }

    /**
     * Return the label property of the category id passed.
     *
     * @param id
     * @returns {*}
     */
    this.labelFilteredCategoryById = function(id) {
      // Get label of selected category.
      return $filter('filter')(Category.cache, {id: id})[0].label;
    };

    /**
     * Return a collection of categories.
     *
     * @returns {$http}
     */
    this.getCategories = function() {
      return $http({
        method: 'GET',
        url: BACKEND_URL + '/api/meter_categories',
        transformResponse: addStyle
      });
    };

    /**
     * From a collection of meters filter the categories (in cache)
     *
     * @param meters
     */
    this.filterByMeterCategories = function(meters) {
      var metersCategorized = $filter('filter')(Utils.toArray(meters), {'meter_categories': '!!'});
      var categoriesDefined = [];




      angular.forEach(metersCategorized, function(meter) {
        console.log(meter.meter_categories);
      }, categoriesDefined);

      console.log('filtered', categorized);
    };

  });
