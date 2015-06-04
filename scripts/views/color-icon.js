(function () {

App.ColorIcon = App.BaseView.extend({
	tagName: 'link',
	init: function () {
		this.sup('init', arguments);
		this.listenTo(this.watch, 'change', this.changeColor, this);
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
	},
	render: function () {
		this.el.rel = 'icon';
		this.changeColor();
	},
	changeColor: function () {
		this.canvas.width = this.canvas.height = 16;
		this.ctx.fillStyle = Color.formatRGBAString(this.watch.get());
		this.ctx.fillRect(0, 0, 16, 16);
		this.el.href = this.canvas.toDataURL();
	}
});

})(this);
