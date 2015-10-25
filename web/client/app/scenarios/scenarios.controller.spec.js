'use strict';

describe('Controller: ScenariosCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ScenariosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScenariosCtrl = $controller('ScenariosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
