'use strict';
(function(){

function AreaComponent($scope) {
  $scope.message = 'Hello';
}

angular.module('webApp')
  .component('area', {
    templateUrl: 'app/area/area.html',
    controller: AreaComponent
  });

})();
