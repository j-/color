(function () {

App.GradientController = ok.Controller.extend({
	stops: 2,
	init: function (options) {
		_.extend(this, _.pick(options, 'stops'));
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
	},
	render: function () {
		this.el.width = this.width;
		this.el.height = this.height;
		this.drawGradient();
	},
	getValueAtStop: function (stop) {
		throw new NotImplementedError();
	},
	createLinearGradient: function (width) {
		var grad = this.ctx.createLinearGradient(0, 0, width, 0);
		var stops = this.stops - 1;
		var stop, value, color;
		for (var i = 0; i <= stops; i++) {
			stop = i / stops;
			value = this.getValueAtStop(stop);
			color = Color.formatRGBAString(value);
			grad.addColorStop(stop, color);
		}
		return grad;
	},
	toDataURL: function (width, height) {
		height = height || 1;
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx.save();
		this.ctx.fillStyle = this.createLinearGradient(width);
		this.ctx.fillRect(0, 0, width, height);
		this.ctx.restore();
		return this.canvas.toDataURL();
	}
});

})();
