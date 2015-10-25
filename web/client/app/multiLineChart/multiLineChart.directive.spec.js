'use strict';

describe('Directive: multiLineChart', function () {

  // load the directive's module and view
  beforeEach(module('webApp'));
  beforeEach(module('app/multiLineChart/multiLineChart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<multi-line-chart></multi-line-chart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the multiLineChart directive');
  }));
});