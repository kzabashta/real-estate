'use strict';

angular.module('webApp')
  .controller('ListingDetailCtrl', function ($scope, $http, $stateParams) {
  	var mls_id = $stateParams.mls_id
	$http.get('/api/raws', {params: {'mls_id': mls_id}}).success(function(listings) {
      $scope.listing = listings[0];
      console.log($scope.listing)
    });
  });
