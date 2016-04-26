'use strict';

describe('Directive: areaGraph', function () {

  // load the directive's module
  beforeEach(module('webApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<area-graph></area-graph>');
    element = $compile(element)(scope);
  }));
});
