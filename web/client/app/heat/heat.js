'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('heat', {
        url: '/heat',
        template: '<heat></heat>'
      });
  });
