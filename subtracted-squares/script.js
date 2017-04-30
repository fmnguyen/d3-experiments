// Testing color inversion with squares

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
	numColors = 2,
	numSquares =  14;

var quadrants = d3.range(0, 4, 1).map(function(d) {
	return { x: d % 2, y: Math.floor(d / 2)}
});

var data = d3.range(0, numSquares + 1, 1)

for (var even = 0; even < 2; even++) {

	var svg = d3.select('.background').append('svg')
				.attr('class', function(d){
					if (even == 1)
						return "first"
					else
						return "second"
				})
				.attr('width', w)
				.attr('height', h)
				.attr('x', 0)
				.attr('y', 0)
				.style('background-color', 'transparent')
				.attr('mask', function(d) {
					if (even == 1)
						return "url(#mask)";
					else
						return "";
				})
				.style('position', 'absolute')

	if (even == 1)
		svg = d3.select('.first')
	else
		svg = d3.select('.second')

	var mask = svg.append('mask')
				.attr('id', 'mask')
				.append('rect')
				.attr('fill', 'white')
				.attr('width', w / 2)
				.attr('height', h / 2)
				.attr('x', w / 4)
				.attr('y', w / 4)

	var g = svg.selectAll('g')
					.data(quadrants)
				.enter()
				.append('g')
					.attr('class', 'pathContainer')
					.attr('transform', function(d) {
						return 'translate(' + [d.x * w/2, d.y * h/2] + ')';
					})
					.attr('background-color', function(d) {
						if (even == 1)
							return "white"
						else
							return ""
					})

	var path = g.selectAll('rect')
					.data(data)
				.enter().append('rect')
				.attr('class', 'rect')
				.attr('fill', function(d, i) {
					if (even == 1)
						return i % 2 == 0 ? 'white' : 'black' ;
					else
						return i % 2 == 0 ? 'black' : 'white' ;
				})
				.attr('width', function(d, i) {
					return w / 2 - d * 20
				})
				.attr('height', function(d, i) {
					return h / 2 - d * 20
				})
				.attr('x', function(d, i) {
					return d * 20 / 2
				})
				.attr('y', function(d, i) {
					return d * 20 / 2
				});
}

