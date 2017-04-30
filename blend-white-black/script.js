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
	numColors = 2;

// Use chroma to generate an entire hsl circle array, with length numColors
var hsl = Array.apply(null, {length: numColors}).map(function(d, i) {
	return chroma.hsl(360 / numColors * (i + 1), 0.85, 0.80); // rotate around the hsl color space
})

var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var g = svg.append('g')
			.attr('class', 'pathContainer')
			.attr('transform', function(d, i) {
				return 'translate(' + [w/2, h/2] + ')';
			})
			.style('isolation', 'isolate');

var path = g.selectAll('circle')
				.data(d3.range(0,2,1))
			.enter().append('circle')
			.attr('class', 'circle')
			.attr('fill', function(d, i) { return i % 2 == 0 ? 'black' : 'white' ; })
			.attr('r', size / 1.75)
			.attr('cx', function(d, i){
				var ø = 2 * π / numColors * i;
				return size / 2.5 * _cos(ø);
			})
			.attr('cy', function(d, i){
				var ø = 2 * π / numColors * i;
				return size / 2.5 * _sin(ø);
			})
			//.style('mix-blend-mode', function(d,i) { return i % 2 == 0 ? 'multiply' : 'screen' ;})
			.style('mix-blend-mode', 'luminosity')