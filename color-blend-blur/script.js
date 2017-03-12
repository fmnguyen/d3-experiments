// Testing color blending in d3 svg elements
// Testing how chroma.js works http://gka.github.io/chroma.js/#quick-start
// help and concept from Nadieh https://www.visualcinnamon.com/2016/05/beautiful-color-blending-svg-d3.html
// help for generating colors and circles from Shirley Wu http://bl.ocks.org/sxywu/533cece25dffcf3744da1e2d29653673
// Gaussian blur effect

var w = h = 600,
	r = h / 5,
	D = r * 2; // width and height

// just some nicer math functions
var π = Math.PI;
function _cos(val) {
	return Math.cos(val);
}
function _sin(val) {
	return Math.sin(val);
}

var size = 100,
	numColors = 5;

// Use chroma to generate an entire hsl circle array, with length numColors
var hsl = Array.apply(null, {length: numColors}).map(function(d, i) {
	return chroma.hsl(360 / numColors * (i + 1), 0.8, 0.85); // rotate around the hsl color space
})

var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var g = svg.selectAll('g')
					.data(hsl)
				.enter().append('g')
					.attr('class', 'pathContainer')
					.attr('transform', function(d, i) {
						return 'translate(' + [w/2, h/2] + ')';
					})
					.style('isolation', 'auto');

var path = g.append('circle')
				.attr('class', 'circle')
				.attr('fill', function(d) { return d; })
				.attr('r', size / 2)
				.attr('cx', function(d, i){
					var ø = 2 * π / numColors * i;
					return size / 3 * _sin(ø);
				})
				.attr('cy', function(d, i){
					var ø = 2 * π / numColors * i;
					return size / 3 * _cos(ø);
				})
				.style('mix-blend-mode', 'multiply')

// Courtesy of Nadieh @ https://www.visualcinnamon.com/2016/05/real-life-motion-effects-d3-visualization.html
//Always start by appending a defs (definitions) element
var defs = g.append("defs");

//Initialize the filter
defs.append("filter")
	.attr("id", "motionFilter") 	//Give it a unique ID
	.attr("width", "300%")		//Increase the width of the filter region to remove blur "boundary"
	.attr("x", "-100%") 			//Make sure the center of the "width" lies in the middle of the element
	.append("feGaussianBlur")	//Append a filter technique
	.attr("class", "blurValues")	//Needed to select later on for gaussian blur during an animation
	.attr("in", "SourceGraphic")	//Perform the blur on the applied element
	.attr("stdDeviation", "4 4");	//Do a blur of 8 standard deviations in the 	horizontal direction and 0 in vertical

//Apply the filter to an element
d3.selectAll("circle").style("filter", "url(#motionFilter)");