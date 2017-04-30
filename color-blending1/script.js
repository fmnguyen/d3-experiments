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
	numColors = 18;

var x0 = w / 2,
	y0 = h / 2,
	x1 = w / 2,
	y1 = h / 2 - D,
	cx = r / 1.5,
	cy = r / 2.0,

	svgData = 	"M" + [x0, y0] +
				"C" + [x0 + cx, y0 - cy, x1 + cx, y1 + cy, x1, y1] +
				"M" + [x0, y0] +
				"C" + [x0 - cx, y0 - cy, x1 - cx, y1 + cy, x1, y1] +
				"Z";
var colors = chroma.scale(['#F9A781', '#EF7960', '#C4A49D', '#A67CA0', '#7C4098', '#785C96', '#F9A781']).colors(numColors)

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

// All of the paths that you are trying to blend all have to live in the same group container
var g = svg.append('g')
			.attr('class', 'pathContainer')
			.style('isolation', 'isolate')

// So we append the data to the path object as opposed to the groups
// this makes sure we create one group with all the paths
// as opposed to data.length many groups and paths
var path = g.selectAll('path')
				.data(colors)
					.enter()
				.append('path')
				.attr('class', 'path')
				.attr('fill', function(d) { return d; })
				.attr('transform', function(d, i) {
					var θ = 360 / numColors * i
					var x = w / 2
					var y = h / 2
					return 'rotate(' + [θ, x, y] + ')';
				})
				.attr('d', svgData)
				.style('mix-blend-mode', 'multiply')