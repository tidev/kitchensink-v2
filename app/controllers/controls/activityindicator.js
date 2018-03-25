
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function showIndicator() {
	$.indicatorLight.show();
	$.indicatorDark.show();
	$.indicatorBig.show();
	$.indicatorMessage.show();
	$.indicatorNavBar.show();
}

// eslint-disable-next-line no-unused-vars
function changeTintColor(e) {
	const colors = [ 'red', 'green', 'blue', 'yellow', 'purple' ];

	$.indicatorLight.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorDark.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorBig.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorMessage.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorNavBar.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
}
