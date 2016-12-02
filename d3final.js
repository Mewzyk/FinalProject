/*
Svg Width and Height
*/
var width = 1000,
    height = 600;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
	.style("margin", "none")
	.style("display", "block");

var color = d3.scaleThreshold()
    .domain([500000, 200000, 300000, 400000, 500000, 600000, 700000, 2000000])
    .range(d3.schemeOrRd[9]);

var boom = d3.schemeOrRd[9];

var borderPath = svg.append("rect")
	.attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("stroke", "#000")
    .style("fill", "none")
    .style("stroke-width", "1");

console.log(color(0));

var projection = d3.geoAlbers()
	.center([-26,37.7])
	.parallels([37.6, 37.85])
	.scale(50000);

var path = d3.geoPath()
    .projection(projection);

d3.json("valleyZipFinal.json", function(error, ca) {
	if (error) return console.error(error);

  	var valleyZip = topojson.feature(ca, ca.objects.siliconValleyFinal)
	
	svg.append("g")
    	.selectAll("path")
    	.data(topojson.feature(ca, ca.objects.siliconValleyFinal).features)
    	.enter().append("path")
      	.attr("fill", function(d){
			currData = d.properties.Y2008_09
			if (currData == null) {
      			return "#fff7ec";
			}
			else{
				return color(d.properties.Y2008_09);
			}
	})
		.attr("opacity", "1")
		.attr("d", path);
});
			
d3.json("siliconValley.json", function(error, ca) {
	if (error) return console.error(error);

  	var caCounty = topojson.feature(ca, ca.objects.caCounty);
	
	svg.append("g")
		.selectAll("path")
		.data(topojson.feature(ca, ca.objects.caCounty).features)
		.enter().append("path")
		.attr("fill", "#000")
		.attr("opacity", "0.1")
		.attr("d", path);
	
	svg.append("path")
      	.datum(topojson.mesh(ca, ca.objects.caCounty, function(a, b) { return a != b; }))
      	.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-opacity", "1")
      	.attr("d", path);

});

