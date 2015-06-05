(function () {

App.PreviewThumbnailView = App.BaseView.extend({
	classNames: ['thumbnail'],
	events: {
		'dblclick': 'toggleFullscreen'
	},
	init: function () {
		this.sup('init', arguments);
		this.listenTo(this.watch, 'change', this.updateColor, this);
		this.$color = $(document.createElement('div'))
			.addClass('color')
			.css('width', '100%')
			.css('height', '100%');
	},
	render: function () {
		this.empty();
		this.$color.appendTo(this.$el);
		this.updateColor();
	},
	updateColor: function () {
		var color = this.watch.get();
		var string = Color.formatHexString(color);
		this.$color.css('backgroundColor', string);
	},
	toggleFullscreen: function (e) {
		if (this.isFullscreen()) {
			this.exitFullscreen();
		}
		else {
			var el = this.$color.get(0);
			this.enterFullscreen(el);
		}
	},
	isFullscreen: function () {
		return (
			document.fullscreenElement ||
			document.mozFullScreenElement ||
			document.webkitFullscreenElement ||
			document.msFullscreenElement
		);
	},
	enterFullscreen: function (el) {
		if (el.requestFullscreen) {
			el.requestFullscreen();
		}
		else if (el.msRequestFullscreen) {
			el.msRequestFullscreen();
		}
		else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen();
		}
		else if (el.webkitRequestFullscreen) {
			el.webkitRequestFullscreen();
		}
	},
	exitFullscreen: function () {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
		else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

})(this);
