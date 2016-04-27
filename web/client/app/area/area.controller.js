'use strict';
(function(){

function AreaComponent($scope) {
  var data = [
    {
      key: "Group1",
      value: 37,
      date: "04/23/12"
    },
    {
      key: "Group2",
      value: 12,
      date: "04/23/12"
    },
    {
      key: "Group3",
      value: 46,
      date: "04/23/12"
    },
    {
      key: "Group1",
      value: 30,
      date: "04/24/12"
    },
    {
      key: "Group2",
      value: 10,
      date: "04/24/12"
    },
    {
      key: "Group3",
      value: 40,
      date: "04/24/12"
    },
    {
      key: "Group1",
      value: 37,
      date: "04/25/12"
    },
    {
      key: "Group2",
      value: 12,
      date: "04/25/12"
    },
    {
      key: "Group3",
      value: 46,
      date: "04/25/12"
    }
  ];
  $scope.data = data;
}

angular.module('webApp')
  .component('area', {
    templateUrl: 'app/area/area.html',
    controller: AreaComponent
  });

})();
