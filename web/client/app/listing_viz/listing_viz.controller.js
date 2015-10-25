'use strict';

angular.module('webApp')
  .controller('ListingVizCtrl', function ($scope, $http) {
	$http.get('/api/raws/aggregate_sales').success(function(data) {
      $scope.data = data;
    });
});
