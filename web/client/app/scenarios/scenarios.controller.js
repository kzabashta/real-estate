'use strict';

angular.module('webApp')
  .controller('ScenariosCtrl', function ($scope, $state, $stateParams, $http) {
    $scope.income = $stateParams.income;
    $scope.years = $stateParams.years;
    $scope.incomeYears = 20;
    $scope.inheritance = 90000;
    $scope.savings = 500;
    $scope.age = 55;

    $scope.change = function(){
    	var data = [];
    	var savings = [];
    	var currentSavings = 0;
    	// calculate savings stage
    	for(var i = 0; i < $scope.years; i++){
    		currentSavings += $scope.savings;
    		savings.push(currentSavings);
    	}

    	// calculate retirement stage
    	for(var i = 0; i < $scope.incomeYears; i++)
    	{
    		savings.push(currentSavings);
    	}

    	for(var i = 0; i < (parseInt($scope.incomeYears) + parseInt($scope.years)); i++)
    	{
    		console.log(i);
    		data.push({date: i+$scope.age, temperature: savings[i]});
    	}

    	console.log(data);
    	$scope.data = {start: $scope.age, 
    		end: $scope.age + parseInt($scope.incomeYears) + parseInt($scope.years),
    		data: {"scenario0": data}
    	};
   	}

   	$scope.change();
});
