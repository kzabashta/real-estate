'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('area', {
        url: '/area',
        template: '<area></area>'
      });
  });
