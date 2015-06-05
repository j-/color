(function () {

App.BinaryView = App.BaseView.extend({
	init: function () {
		this.listenTo(this.watch, 'change', this.updateColor, this);
	},
	render: function () {
		this.empty();
		var frag = document.createDocumentFragment();
		var $bit;
		for (var i = 0; i < 24; i++) {
			$bit = $(document.createElement('span'))
				.addClass('bit')
				.appendTo(frag);
			if (i < 8) {
				$bit.addClass('bit-red');
			}
			else if (i < 16) {
				$bit.addClass('bit-green');
			}
			else {
				$bit.addClass('bit-blue');
			}
		}
		this.$el.append(frag);
		this.updateColor();
	},
	updateColor: function () {
		var color = this.watch.get();
		this.$('.bit').each(function (i) {
			var $bit = $(this);
			var bit = color & (1 << (23 - i)) ? 1 : 0;
			$bit.text(bit);
		});
	}
});

})(this);
