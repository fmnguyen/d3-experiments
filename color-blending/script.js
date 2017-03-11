// Testing color blending in d3 svg elements
// Testing how chroma.js works http://gka.github.io/chroma.js/#quick-start
// help and concept via https://www.visualcinnamon.com/2016/05/beautiful-color-blending-svg-d3.html

var n = 231,		 // number of wedges
	w = h = 600, // width and height
	row = col = 7,
	r = w / row;

// just some nicer math functions
var π = Math.PI;
function _cos(val) {
	return Math.cos(val);
}
function _sin(val) {
	return Math.sin(val);
}

var range = d3.range(0, 3 * π, 0.01)

var data = d3.range(0, row * col)
			.map(function(d){
				return { a: d % row + 1, b: Math.floor(d / col) + 1 }
			});

// create our background svg parent
var svg = d3.select('.background').append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('background-color', 'transparent')

var circles = svg.selectAll('path')
					.data(data)
				.enter().append('path')
					.attr('fill', 'none')
					.attr('stroke', 'black')
					.attr('stroke-width', 1)
					.attr('stroke-opacity', 0.8)
					.attr('transform', function(d) {
						return 'translate(' + [(d.a - 1) * r, (d.b - 1) * r] + ')'
					})
					.attr('d', function(d) {
						return 'M' + range.map(function(p) {
							return [
								0.4 * r * _sin(d.a * p) + r / 2,
								0.4 * r * _sin(d.b * p) + r / 2
							]
						}).join("L")
					});