(function () {

App.OutputView = App.BaseView.extend({
	init: function () {
		var colorProperty = this.watch.property('color');
		this.listenTo(colorProperty, 'change', this.changeColor);
		this.binaryView = this.addChildView(App.BinaryView, { watch: colorProperty });
		this.previewThumbnailView = this.addChildView(App.PreviewThumbnailView, { watch: colorProperty });
	},
	render: function () {
		this.binaryView.setElement('#output-binary');
		this.previewThumbnailView.setElement('#output-preview');
		this.sup('render');
	},
	start: function () {
		this.sup('start');
		this.changeColor();
	},
	changeColor: function () {
		var value = this.watch.get('color');
		var color = Color(value);
		var rgb = Color.getRGBArray(color);
		var hsl = Color.getHSLArray(color);
		var cmyk = Color.getCMYKArray(color);
		this.$('#output-decimal').val(Number(color));
		this.$('#output-red').val(rgb[Color.R]);
		this.$('#output-red-ratio').val(rgb[Color.R] / 0xff);
		this.$('#output-green').val(rgb[Color.G]);
		this.$('#output-green-ratio').val(rgb[Color.G] / 0xff);
		this.$('#output-blue').val(rgb[Color.B]);
		this.$('#output-blue-ratio').val(rgb[Color.B] / 0xff);
		this.$('#output-hue').val(hsl[Color.H]);
		this.$('#output-hue-ratio').val(hsl[Color.H] / 360);
		this.$('#output-saturation').val(hsl[Color.S] * 100);
		this.$('#output-saturation-ratio').val(hsl[Color.S]);
		this.$('#output-lightness').val(hsl[Color.L] * 100);
		this.$('#output-lightness-ratio').val(hsl[Color.L]);
		this.$('#output-cyan').val(cmyk[Color.C]);
		this.$('#output-magenta').val(cmyk[Color.M]);
		this.$('#output-yellow').val(cmyk[Color.Y]);
		this.$('#output-key').val(cmyk[Color.K]);
		this.$('#output-string-hex').val(Color.formatHexString(color));
		this.$('#output-string-hexshort').val(Color.formatShortHexString(color));
		this.$('#output-string-rgb').val(Color.formatRGBString(color));
		this.$('#output-string-rgb-percentage').val(Color.formatRGBPercentString(color));
		this.$('#output-string-rgba').val(Color.formatRGBAString(color));
		this.$('#output-string-rgba-percentage').val(Color.formatRGBAPercentString(color));
		this.$('#output-string-hsl').val(Color.formatHSLString(color));
		this.$('#output-string-hsla').val(Color.formatHSLAString(color));
		this.$('#output-string-keyword').val(Color.getClosestKeyword(color));
	}
});

})();
