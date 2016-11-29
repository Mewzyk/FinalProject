/*
Svg Width and Height
*/
var width = 960,
    height = 1100;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scaleThreshold()
    .domain([500000, 200000, 300000, 400000, 500000, 600000, 700000, 2000000])
    .range(d3.schemeOrRd[9]);

var projection = d3.geoAlbers()
	.center([-26.25,37.81])
	.parallels([37.6, 37.85])
	.scale(50000);

var path = d3.geoPath()
    .projection(projection);

d3.json("valleyZip.json", function(error, ca) {
	if (error) return console.error(error);

  	var valleyZip = topojson.feature(ca, ca.objects.valleyZIP);
	
	console.log(valleyZip.features);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.valleyZIP).features)
    	.enter().append("path")
      	.attr("fill", "black")
		.attr("opacity", ".8")
		.attr("d", path);
	
});
			
d3.json("siliconValley.json", function(error, ca) {
	if (error) return console.error(error);

  	var caCounty = topojson.feature(ca, ca.objects.caCounty);
	
	console.log(topojson.feature(ca, ca.objects.Oakland).features);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.Oakland).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.SF).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.SanMateo).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.PaloAlto).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.SanJose).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.Hayward).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.Freemont).features)
    	.enter().append("path")
      	.attr("fill", function(d){return "#000";})
		.attr("d", path);
	
	svg.append("g")
		.selectAll("path")
		.data(topojson.feature(ca, ca.objects.caCounty).features)
		.enter().append("path")
		.attr("fill", "#000")
		.attr("opacity", "0.1")
		.attr("d", path)
});


