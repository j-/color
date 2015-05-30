(function () {

var HueSlider = App.GradientSliderView.extend({
	stops: 36,
	getValueAtStop: function (stop) {
		var color = this.watch.get('color');
		var s = Color.getSaturation(color);
		var l = Color.getLightness(color);
		var value = Color.parseHSLArray([stop * 360, s, l]);
		return value;
	}
});

var SaturationSlider = App.GradientSliderView.extend({
	getValueAtStop: function (stop) {
		var color = this.watch.get('color');
		var h = Color.getHue(color);
		var l = Color.getLightness(color);
		var value = Color.parseHSLArray([h, stop, l]);
		return value;
	}
});

var LightnessSlider = App.GradientSliderView.extend({
	stops: 3,
	getValueAtStop: function (stop) {
		var color = this.watch.get('color');
		var h = Color.getHue(color);
		var s = Color.getSaturation(color);
		var value = Color.parseHSLArray([h, s, stop]);
		return value;
	}
});

App.SliderGroupHSLView = App.SliderGroupView.extend({
	classNames: ['slider-group-hsl'],
	init: function () {
		this.sup('init', arguments);
		this.hueGradientView = this.addChildView(HueSlider, { watch: this.watch });
		this.saturationGradientView = this.addChildView(SaturationSlider, { watch: this.watch });
		this.lightnessGradientView = this.addChildView(LightnessSlider, { watch: this.watch });
	},
	render: function () {
		this.empty();
		this.$el
			.append(this.hueGradientView.el)
			.append(this.saturationGradientView.el)
			.append(this.lightnessGradientView.el);
		this.sup('render');
	}
});

})();
