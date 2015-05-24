(function (root) {

var RedSlider = App.GradientView.extend({
	getValueAtStop: function (color, stop) {
		var g = Color.getGreen(color);
		var b = Color.getBlue(color);
		var value = Color.parseRGBArray([stop * 0xff, g, b]);
		return value;
	}
});

var GreenSlider = App.GradientView.extend({
	getValueAtStop: function (color, stop) {
		var r = Color.getRed(color);
		var b = Color.getBlue(color);
		var value = Color.parseRGBArray([r, stop * 0xff, b]);
		return value;
	}
});

var BlueSlider = App.GradientView.extend({
	getValueAtStop: function (color, stop) {
		var r = Color.getRed(color);
		var g = Color.getGreen(color);
		var value = Color.parseRGBArray([r, g, stop * 0xff]);
		return value;
	}
});

var HueSlider = App.GradientView.extend({
	stops: 36,
	getValueAtStop: function (color, stop) {
		var s = Color.getSaturation(color);
		var l = Color.getLightness(color);
		var value = Color.parseHSLArray([stop * 360, s, l]);
		return value;
	}
});

var SaturationSlider = App.GradientView.extend({
	getValueAtStop: function (color, stop) {
		var h = Color.getHue(color);
		var l = Color.getLightness(color);
		var value = Color.parseHSLArray([h, stop, l]);
		return value;
	}
});

var LightnessSlider = App.GradientView.extend({
	stops: 3,
	getValueAtStop: function (color, stop) {
		var h = Color.getHue(color);
		var s = Color.getSaturation(color);
		var value = Color.parseHSLArray([h, s, stop]);
		return value;
	}
});

App.AppView = App.BaseView.extend({
	events: {
		'click #randomize-color': 'randomizeColor'
	},
	init: function () {
		this.inputView = this.addChildView(App.InputView, {
			watch: this.watch
		});
		this.outputView = this.addChildView(App.OutputView, {
			watch: this.watch
		});
		this.redGradientView = this.addChildView(RedSlider, { watch: this.watch });
		this.greenGradientView = this.addChildView(GreenSlider, { watch: this.watch });
		this.blueGradientView = this.addChildView(BlueSlider, { watch: this.watch });
		this.hueGradientView = this.addChildView(HueSlider, { watch: this.watch });
		this.saturationGradientView = this.addChildView(SaturationSlider, { watch: this.watch });
		this.lightnessGradientView = this.addChildView(LightnessSlider, { watch: this.watch });
		this.listenTo(this.inputView, 'change', this.handleInputChange);
		_.bindAll(this, 'randomizeColor');
	},
	render: function () {
		this.sup('render');
		this.$('#sliders-rgb')
			.append(this.redGradientView.el)
			.append(this.greenGradientView.el)
			.append(this.blueGradientView.el);
		this.$('#sliders-hsl')
			.append(this.hueGradientView.el)
			.append(this.saturationGradientView.el)
			.append(this.lightnessGradientView.el);
	},
	handleInputChange: function (value) {
		this.trigger('change:input', value);
	},
	randomizeColor: function () {
		this.watch.set('color', Color.random());
	}
});

})(this);
