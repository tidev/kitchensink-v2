
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function showIndicator() {
	$.indicatorLight.show();
	$.indicatorDark.show();
	$.indicatorBig.show();
	$.indicatorMessage.show();
	$.indicatorNavBar.show();
}

function changeTintColor() {
	const colors = [ 'red', 'green', 'blue', 'yellow', 'purple' ];

	$.indicatorLight.indicatorColor = colors[_.random(0, colors.length - 1)];
	$.indicatorDark.indicatorColor = colors[_.random(0, colors.length - 1)];
	$.indicatorBig.indicatorColor = colors[_.random(0, colors.length - 1)];
	$.indicatorMessage.indicatorColor = colors[_.random(0, colors.length - 1)];
	$.indicatorNavBar.indicatorColor = colors[_.random(0, colors.length - 1)];
}
