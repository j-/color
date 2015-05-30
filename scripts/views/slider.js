(function () {

App.SliderView = App.BaseView.extend({
	classNames: ['slider'],
	startX: null,
	position: null,
	ticks: 100,
	events: {
		'mousedown': 'dragStart'
	},
	init: function () {
		_.bindAll(this, 'dragStart', 'dragStop', 'dragUpdate');
		this.$scrubber = $(document.createElement('div')).addClass('scrubber');
		this.position = ok.Property.create();
		this.listenTo(this.position, 'change', this.moveScrubber, this);
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
		var value = clamped / width;
		// round to nearest tick
		value *= this.ticks;
		value = Math.round(value);
		value /= this.ticks;
		this.position.set(value);
	},
	getLeft: function () {
		return this.$el.offset().left;
	},
	getWidth: function () {
		return this.$el.width();
	},
	moveScrubber: function (prop, value) {
		this.$scrubber.css('left', (value * 100) + '%');
	}
});

})(this);
