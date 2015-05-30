(function () {

App.SlidersView = App.BaseView.extend({
	init: function () {
		this.sup('init', arguments);
		this.rgbSliderView = this.addChildView(App.SliderGroupRGBView, { watch: this.watch });
		this.hslSliderView = this.addChildView(App.SliderGroupHSLView, { watch: this.watch });
	},
	render: function () {
		this.empty();
		this.$el
			.append('<h3>RGB</h3>')
			.append(this.rgbSliderView.el)
			.append('<h3>HSL</h3>')
			.append(this.hslSliderView.el);
		this.sup('render');
	}
});

})();
