'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('listing_viz', {
        url: '/listing_viz',
        templateUrl: 'app/listing_viz/listing_viz.html',
        controller: 'ListingVizCtrl'
      });
  });