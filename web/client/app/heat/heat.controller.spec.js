'use strict';

describe('Component: HeatComponent', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var HeatComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    HeatComponent = $componentController('HeatComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
