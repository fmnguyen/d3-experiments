// Testing color blending in d3 svg elements
// Testing how chroma.js works http://gka.github.io/chroma.js/#quick-start
// help and concept from Nadieh https://www.visualcinnamon.com/2016/05/beautiful-color-blending-svg-d3.html
// help for generating colors and circles from Shirley Wu http://bl.ocks.org/sxywu/533cece25dffcf3744da1e2d29653673

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
	numColors = 36;

// Create our lense shape (basically an ellipse that meets at a point)
var x0 = w / 2,
	y0 = h / 2,
	x1 = w / 2,
	y1 = h / 2 - D,
	cx = r / 2.5,
	cy = r / 2.0,
	svgData = 	"M" + [x0, y0] +
				"C" + [x0 + cx, y0 - cy, x1 + cx, y1 + cy, x1, y1] +
				"M" + [x0, y0] +
				"C" + [x0 - cx, y0 - cy, x1 - cx, y1 + cy, x1, y1] +
				"Z";

// Use chroma to generate an entire hsl circle array, with length numColors
var hsl = Array.apply(null, {length: numColors}).map(function(d, i){
	return chroma.hsl(360 / numColors * (i + 1), 0.875, 0.70); // rotate around the hsl color space
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
						var θ = 360 / numColors * i
						var x = w / 2
						var y = h / 2
						return 'rotate(' + [θ, x, y] + ')';
					})
					.style('isolation', 'auto');

var path = g.append('path')
				.attr('class', 'path')
				.attr('fill', function(d) { return d; })
				.attr('d', svgData)
				.style('mix-blend-mode', 'multiply')