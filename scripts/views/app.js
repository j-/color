(function (root) {

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
		this.slidersView = this.addChildView(App.SlidersView, {
			watch: this.watch
		});
		this.listenTo(this.inputView, 'change', this.handleInputChange);
		_.bindAll(this, 'randomizeColor');
	},
	handleInputChange: function (value) {
		this.trigger('change:input', value);
	},
	randomizeColor: function () {
		this.watch.set('color', Color.random());
	}
});

App.NotImplementedError = ok.Error.extend({
	name: 'NotImplementedError',
	message: 'This method is not implemented'
});

})(this);
