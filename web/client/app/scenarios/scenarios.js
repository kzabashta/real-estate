'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scenarios', {
        url: '/scenarios?years&income',
        templateUrl: 'app/scenarios/scenarios.html',
        controller: 'ScenariosCtrl'
      });
  });