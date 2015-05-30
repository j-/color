(function () {

App.SliderGroupView = App.BaseView.extend({
	classNames: ['slider-group'],
	init: function () {
		this.sup('init', arguments);
		this.listenTo(this.watch, 'change', this.changeValues, this);
	},
	changeValues: function () {
		throw new App.NotImplementedError();
	}
});

})();
