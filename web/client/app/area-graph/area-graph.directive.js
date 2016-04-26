'use strict';

angular.module('webApp')
  .directive('areaGraph', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the areaGraph directive');
      }
    };
  });
