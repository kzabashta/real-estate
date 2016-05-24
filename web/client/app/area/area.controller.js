'use strict';
(function(){

function AreaComponent($scope, $http) {
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
      key: "Group4",
      value: 50,
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
      value: 5,
      date: "04/24/12"
    },
    {
      key: "Group4",
      value: 8,
      date: "04/24/12"
    },
    {
      key: "Group1",
      value: 50,
      date: "04/25/12"
    },
    {
      key: "Group2",
      value: 12,
      date: "04/25/12"
    },
    {
      key: "Group3",
      value: 1,
      date: "04/25/12"
    },
    {
      key: "Group4",
      value: 5,
      date: "04/25/12"
    }
  ];
  /**var newData=[];
  $http.get('/api/raws/aggregate_sales').success(function(data) {
    for(var i = 0; i < data.length; i++){
      for(var j = 0; j < data[i].municipality.length; j++){
        var point = {
          key: data[i].municipality[j].municipality,
          date: data[i]._id,
          value: data[i].municipality[j].count,
        };
        console.log(point);
        newData.push({
          key: data[i].municipality[j].municipality,
          date: new Date(data[i]._id),
          value: data[i].municipality[j].count,
        });
      }
    }
    $scope.data = newData;
  });**/
  $scope.data = data;
}

angular.module('webApp')
  .component('area', {
    templateUrl: 'app/area/area.html',
    controller: AreaComponent
  });

})();
