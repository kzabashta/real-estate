'use strict';

describe('Controller: ListingVizCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ListingVizCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingVizCtrl = $controller('ListingVizCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
