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

App.SliderGroupRGBView = App.SliderGroupView.extend({
	classNames: ['slider-group-rgb'],
	init: function () {
		this.sup('init', arguments);
		this.redGradientView = this.addChildView(RedSlider, { watch: this.watch });
		this.greenGradientView = this.addChildView(GreenSlider, { watch: this.watch });
		this.blueGradientView = this.addChildView(BlueSlider, { watch: this.watch });
	},
	render: function () {
		this.empty();
		this.$el
			.append(this.redGradientView.el)
			.append(this.greenGradientView.el)
			.append(this.blueGradientView.el);
		this.sup('render');
	}
});

})();
