(function (root) {

var State = ok.Map.extend({
	defaults: {
		color: 0
	}
});

var App = ok.Controller.extend({
	watch: State.create(),
	injects: ['watch'],
	init: function (options) {
		this.view = this.create(App.AppView, {});
	},
	start: function () {
		this.view.render();
		this.view.start();
		this.listenTo(this.view, 'change:input', this.handleInputChange);
	},
	handleInputChange: function (value) {
		this.watch.set('color', Color.parse(value));
	}
});

root.App = App;

})(this);
