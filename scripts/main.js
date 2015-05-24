(function () {

var app = App.create();

$(function () {
	app.view.setElement('#app');
	app.view.inputView.setElement('#color-input');
	app.view.outputView.setElement('#output');
	app.start();
});

})();
