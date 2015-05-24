(function () {

var NotImplementedError = ok.Error.extend({
	name: 'NotImplementedError',
	message: 'This method is not implemented'
});

App.GradientView = App.BaseView.extend({
	tagName: 'canvas',
	classNames: ['gradient'],
	width: 600,
	height: 20,
	stops: 2,
	init: function () {
		this.ctx = this.el.getContext('2d');
		this.listenTo(this.watch.property('color'), 'change', this.drawGradient);
	},
	render: function () {
		this.el.width = this.width;
		this.el.height = this.height;
		this.drawGradient();
	},
	getValueAtStop: function (color, stop) {
		throw new NotImplementedError();
	},
	createLinearGradient: function (base) {
		var grad = this.ctx.createLinearGradient(0, 0, this.width, 0);
		var stops = this.stops - 1;
		var stop, value, color;
		for (var i = 0; i <= stops; i++) {
			stop = i / stops;
			value = this.getValueAtStop(base, stop);
			color = Color.formatRGBAString(value);
			grad.addColorStop(stop, color);
		}
		return grad;
	},
	drawGradient: function () {
		var color = this.watch.get('color');
		this.ctx.save();
		this.ctx.fillStyle = this.createLinearGradient(color);
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.restore();
	}
});

})();
