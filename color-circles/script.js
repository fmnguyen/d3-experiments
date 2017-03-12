// Testing color blending in d3 svg elements
// Testing how chroma.js works http://gka.github.io/chroma.js/#quick-start
// help and concept from Nadieh https://www.visualcinnamon.com/2016/05/beautiful-color-blending-svg-d3.html
// help for generating colors and circles from Shirley Wu http://bl.ocks.org/sxywu/533cece25dffcf3744da1e2d29653673


var w = h = 600; // width and height

// just some nicer math functions
var π = Math.PI;
function _cos(val) {
	return Math.cos(val);
}
function _sin(val) {
	return Math.sin(val);
}

var size = 100,
	numColors = 36
var colors = chroma.scale(['#F9A781', '#EF7960', '#C4A49D', '#A67CA0', '#7C4098', '#785C96']).colors(numColors)

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var g = svg.selectAll('g')
					.data(colors)
				.enter().append('g')
					.attr('fill', function(d) { return d; })
					.attr('transform', function(d, i) {
						var x = i % 6 * size + size / 2
						var y = Math.floor(i / 6) * size + size / 2
						return 'translate(' + [x, y] + ')'
					})

var circle = g.append('circle')
				.attr('r', size / 4)