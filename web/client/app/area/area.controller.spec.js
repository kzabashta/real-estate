'use strict';

describe('Component: AreaComponent', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var AreaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AreaComponent = $componentController('AreaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
