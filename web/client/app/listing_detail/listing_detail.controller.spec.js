'use strict';

describe('Controller: ListingDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ListingDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingDetailCtrl = $controller('ListingDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
