'use strict';

angular.module('webApp')
.directive('multiLineChart', ['$window', '$timeout', 'd3Service', 
  function($window, $timeout, d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        d3Service.d3().then(function(d3) {

          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);

          scope.render = function(data) {
          	d3.select("svg").remove();
          	if(!data)
          		return;
			var margin = {top: 20, right: 80, bottom: 50, left: 50},
			    width = 960 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var color = d3.scale.category10();

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

			var line = d3.svg.line()
			    .interpolate("basis")
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.temperature); });


			var svg = d3.select("body").append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			  var keys = [];

			  var newData = [];

			  data.forEach(function(d) {
			  	d.municipality.forEach(function(muni){
			  		if(keys.indexOf(muni.municipality) === -1)
			  			keys.push(muni.municipality);
			  	});

			  	d.date = new Date(d._id);
			  	//if(newData.length < 30)
			  		newData.push(d)
			  });

			  data = newData;
			  
			  color.domain(keys);

			  var cities = color.domain().map(function(name) {
			  	var values = [];
			  	data.forEach(function(d){
			  		if(d.ignore)
			  			return;
			  		var val = {date: d.date, temperature: 0}
			  		d.municipality.forEach(function(muni){
			  			if(muni.municipality === name)
			  				val.temperature = muni.count;
			  		});
			  		values.push(val);
			  	});
			    return {
			      name: name,
			      values: values
			    }
			  });

			  x.domain(d3.extent(data, function(d) { return d.date; }));

			  y.domain([
			    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
			    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
			  ]);

			  svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis);

			  svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("Solds");

			  var city = svg.selectAll(".city")
			      .data(cities)
			    .enter().append("g")
			      .attr("class", "city");

			  city.append("path")
			      .attr("class", "line")
			      .attr("d", function(d) { return line(d.values); })
			      .style("stroke", function(d) { return color(d.name); });

				var legendSpace = width/keys.length;

				keys.forEach(function(d,i) {
					console.log(d)
					svg.append("text")                                    // *******
		            .attr("x", (legendSpace/2)+i*legendSpace) // spacing // ****
		            .attr("y", height + (margin.bottom/2)+ 20)         // *******
		            .attr("class", "legend")    // style the legend   // *******
		            .style("fill", function() { // dynamic colours    // *******
		                return color(d); })             // *******
		            .text(d); 
				});

          };
        });
      }}
}])