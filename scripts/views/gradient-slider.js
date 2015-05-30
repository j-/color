(function () {

App.GradientSliderView = App.SliderView.extend({
	classNames: ['gradient'],
	injects: ['stops'],
	init: function () {
		this.sup('init', arguments);
		var color = this.watch.property('color');
		this.gradient = this.create(App.GradientController);
		this.gradient.getValueAtStop = this.getValueAtStop.bind(this);
		this.listenTo(color, 'change', this.drawBackgroundGradient);
		this.listenTo(color, 'change', this.updateScrubberColor);
		this.position.on('change', this.updateColorValue, this);
	},
	render: function () {
		this.sup('render');
		this.drawBackgroundGradient();
		this.updateScrubberColor();
	},
	drawBackgroundGradient: function () {
		var width = this.$el.width();
		var image = this.gradient.toDataURL(width);
		this.$el.css('backgroundImage', 'url(' + image + ')');
	},
	updateColorValue: function (prop, stop) {
		var color = this.watch.property('color');
		var value = this.getValueAtStop(stop);
		color.set(value);
	},
	updateScrubberColor: function () {
		var position = this.position.get();
		var value = this.getValueAtStop(position);
		this.$scrubber.css('backgroundColor', Color.formatRGBAString(value));
	}
});

})();
