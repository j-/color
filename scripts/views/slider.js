(function () {

App.SliderView = App.BaseView.extend({
	classNames: ['slider'],
	startX: null,
	position: null,
	events: {
		'mousedown': 'dragStart'
	},
	init: function () {
		_.bindAll(this, 'dragStart', 'dragStop', 'dragUpdate');
		this.$scrubber = $(document.createElement('div')).addClass('scrubber');
		this.position = ok.Property.create();
	},
	render: function () {
		this.empty();
		this.$el.append(this.$scrubber);
	},
	dragStart: function (e) {
		if (e.button !== 0) {
			return;
		}
		e.preventDefault();
		this.startX = this.getLeft();
		$(window)
			.one('mouseup', this.dragStop)
			.on('mousemove', this.dragUpdate);
		this.dragUpdate(e);
	},
	dragStop: function () {
		$(window).off('mousemove', this.dragUpdate);
	},
	dragUpdate: function (e) {
		var clientX = e.clientX;
		var startX = this.startX;
		var width = this.getWidth();
		var delta = clientX - startX;
		var clamped = Math.max(Math.min(delta, width), 0);
		this.$scrubber.css('left', clamped);
		this.position.set(clamped / width);
	},
	getLeft: function () {
		return this.$el.offset().left;
	},
	getWidth: function () {
		return this.$el.width();
	}
});

})(this);
