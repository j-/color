(function (root) {

App.InputView = App.BaseView.extend({
	events: {
		'keyup': 'handleInput'
	},
	getValue: function () {
		return this.$el.val();
	},
	handleInput: function () {
		var val = this.getValue();
		this.trigger('change', val);
	}
});

})(this);
