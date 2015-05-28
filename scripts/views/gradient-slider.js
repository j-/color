(function () {

App.GradientSliderView = App.SliderView.extend({
	classNames: ['gradient'],
	init: function () {
		this.sup('init', arguments);
		var color = this.watch.property('color');
		this.gradient = App.GradientController.create();
		if (this.stops) {
			this.gradient.stops = this.stops;
		}
		this.gradient.getValueAtStop = this.getValueAtStop.bind(this);
		this.listenTo(color, 'change', this.drawGradient);
		this.listenTo(color, 'change', this.updateScrubber);
		this.position.on('change', this.updatePosition, this);
	},
	render: function () {
		this.sup('render');
		this.drawGradient();
		this.updateScrubber();
	},
	drawGradient: function () {
		var width = this.$el.width();
		var image = this.gradient.toDataURL(width);
		this.$el.css('backgroundImage', 'url(' + image + ')');
	},
	updatePosition: function (prop, stop) {
		var color = this.watch.property('color');
		var value = this.getValueAtStop(stop);
		color.set(value);
	},
	updateScrubber: function () {
		var position = this.position.get();
		var value = this.getValueAtStop(position);
		this.$scrubber.css('backgroundColor', Color.formatRGBAString(value));
	}
});

})();
