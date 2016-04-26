'use strict';
(function(){

function HeatComponent($scope, $http) {
  $scope.message = 'Hello';
  var mymap = L.map('mapid').setView([43.6532, -79.3832], 12);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'kzabashta.pp9m6kh3',
	    accessToken: 'pk.eyJ1Ijoia3phYmFzaHRhIiwiYSI6ImNpbmc1ZHJhcDFjdWV2OGtxNWpoa2Zmb2YifQ.mu9SS_pnOuknAdORkTLDRA'
	}).addTo(mymap);

	var heat_points = [];

	$http.get('/api/raws').success(function(listings) {
    for(var i = 0; i < listings.length; i++){
    	var listing = listings[i];
    	if(listing.long && listing.lat){
    		heat_points.push([listing.lat, listing.long, listing.value])
    	}
    }
  });

  var heat = L.heatLayer(heat_points).addTo(mymap);

}

angular.module('webApp')
  .component('heat', {
    templateUrl: 'app/heat/heat.html',
    controller: HeatComponent
  });

})();
