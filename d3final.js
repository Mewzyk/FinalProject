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
    .domain([500,200000,500000,700000,2000000])
    .range(['#fcae91', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15']);

var boom = d3.schemeOrRd[9];

var borderPath = svg.append("rect")
	.attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("stroke", "#000")
    .attr("fill", "#add8e6")
    .style("stroke-width", "1");

var projection = d3.geoAlbers()
	.center([-26,37.7])
	.parallels([37.6, 37.85])
	.scale(50000);

var path = d3.geoPath()
    .projection(projection);

d3.json("siliconValley.json", function(error, ca) {
	if (error) return console.error(error);

  	var caCounty = topojson.feature(ca, ca.objects.caCounty);
	
	svg.append("g")
		.selectAll("path")
		.data(topojson.feature(ca, ca.objects.caCounty).features)
		.enter().append("path")
		.attr("fill", "#fee5d9")
		.attr("opacity", "1")
		.attr("d", path);
	
	svg.append("path")
      	.datum(topojson.mesh(ca, ca.objects.caCounty, function(a, b) { return a != b; }))
      	.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-opacity", "0")
      	.attr("d", path);

});

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
      			return "#fcae91";
			}
			else{
				return color(d.properties.Y2008_09);
			}
	})
		.attr("opacity", "1")
		.attr("d", path);
});
			


