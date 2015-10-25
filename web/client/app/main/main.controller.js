'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http) {
    $http.get('/api/raws').success(function(listings) {
      $scope.listings = listings;
    });

    $http.get('/api/raws/municipalities').success(function(municipalities) {
      $rootScope.municipalities = municipalities;
    });

    $rootScope.filterMunicipality = function(municipality) {
    	console.log(municipality);
    	$http.get('/api/raws?municipality=' + municipality).success(function(listings) {
      		$scope.listings = listings;
    	});
    }
  });