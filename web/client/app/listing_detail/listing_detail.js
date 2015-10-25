'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('listing_detail', {
        url: '/listing_detail/:mls_id',
        templateUrl: 'app/listing_detail/listing_detail.html',
        controller: 'ListingDetailCtrl'
      });
  });