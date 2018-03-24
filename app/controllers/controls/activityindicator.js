
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

function changeTintColor(e) {
	const colors = [ 'red', 'green', 'blue', 'yellow', 'purple' ];

	$.indicatorLight.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorDark.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorBig.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorMessage.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
	$.indicatorNavBar.setIndicatorColor(colors[_.random(0, colors.length - 1)]);
}
