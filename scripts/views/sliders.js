(function () {

var RedSlider = App.GradientSliderView.extend({
	getValueAtStop: function (stop) {
		var color = this.watch.get('color');
		var g = Color.getGreen(color);
		var b = Color.getBlue(color);
		var value = Color.parseRGBArray([stop * 0xff, g, b]);
		return value;
	}
});

var GreenSlider = App.GradientSliderView.extend({
	getValueAtStop: function (stop) {
		var color = this.watch.get('color');
		var r = Color.getRed(color);
		var b = Color.getBlue(color);
		var value = Color.parseRGBArray([r, stop * 0xff, b]);
		return value;
	}
});

var BlueSlider = App.GradientSliderView.extend({
	getValueAtStop: function (stop) {
		var color = this.watch.get('color');
		var r = Color.getRed(color);
		var g = Color.getGreen(color);
		var value = Color.parseRGBArray([r, g, stop * 0xff]);
		return value;
	}
});

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

App.SlidersView = App.BaseView.extend({
	init: function () {
		this.sup('init', arguments);
		this.redGradientView = this.addChildView(RedSlider, { watch: this.watch });
		this.greenGradientView = this.addChildView(GreenSlider, { watch: this.watch });
		this.blueGradientView = this.addChildView(BlueSlider, { watch: this.watch });
		this.hueGradientView = this.addChildView(HueSlider, { watch: this.watch });
		this.saturationGradientView = this.addChildView(SaturationSlider, { watch: this.watch });
		this.lightnessGradientView = this.addChildView(LightnessSlider, { watch: this.watch });
	},
	render: function () {
		this.empty();
		$(document.createElement('div'))
			.append(this.redGradientView.el)
			.append(this.greenGradientView.el)
			.append(this.blueGradientView.el)
			.appendTo(this.$el);
		$(document.createElement('div'))
			.append(this.hueGradientView.el)
			.append(this.saturationGradientView.el)
			.append(this.lightnessGradientView.el)
			.appendTo(this.$el);
		this.sup('render');
	}
});

})();
