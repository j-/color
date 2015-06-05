(function () {

App.BaseView = ok.$View.extend({
	mergeProperties: ['bindAll', 'events'],
	bindAll: [],
	events: {},
	init: function () {
		this.sup('init', arguments);
		if (this.bindAll.length) {
			_.bindAll(this, this.bindAll);
		}
	},
	start: function () {
		this.sup('start', arguments);
		this.bindEvents();
	},
	stop: function () {
		this.sup('stop', arguments);
		this.unbindEvents();
	},
	bindEvents: function () {
		this.unbindEvents();
		var events = this.events;
		_.forEach(events, function (fnName, signature) {
			var split = String(signature).split(' ');
			var ev = split[0];
			var el = split[1];
			var callback = this[fnName];
			var args = _.compact([ev, el, callback.bind(this)]);
			this.$el.on.apply(this.$el, args);
		}, this);
	},
	unbindEvents: function () {
		var events = this.events;
		_.forEach(events, function (fnName, signature) {
			var split = String(signature).split(' ');
			var ev = split[0];
			var el = split[1];
			var callback = this[fnName];
			var args = _.compact([ev, el]);
			this.$el.off.apply(this.$el, args);
		}, this);
	},
	empty: function () {
		$(this.$el).children().detach();
	}
});

})();
