(function () {

App.OutputView = App.BaseView.extend({
	init: function () {
		this.listenTo(this.watch.property('color'), 'change', this.changeColor);
	},
	start: function () {
		this.sup('start');
		this.changeColor();
	},
	changeColor: function () {
		var value = this.watch.get('color');
		this.$('#output-preview').css('background-color', Color(value));
		this.$('#output-red').val(Color.getRed(value));
		this.$('#output-green').val(Color.getGreen(value));
		this.$('#output-blue').val(Color.getBlue(value));
		this.$('#output-hue').val(Color.getHue(value));
		this.$('#output-saturation').val(Color.getSaturation(value));
		this.$('#output-lightness').val(Color.getLightness(value));
		this.$('#output-string-hex').val(Color.formatHexString(value));
		this.$('#output-string-hexshort').val(Color.formatShortHexString(value));
		this.$('#output-string-rgb').val(Color.formatRGBString(value));
		this.$('#output-string-rgba').val(Color.formatRGBAString(value));
		this.$('#output-string-hsl').val(Color.formatHSLString(value));
		this.$('#output-string-hsla').val(Color.formatHSLAString(value));
	}
});

})();
