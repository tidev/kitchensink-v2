import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function scrollToView() {
	$.scrollable.scrollToView(1); // Index or view
}

// eslint-disable-next-line no-unused-vars
function addNewView() {
	const newView = Ti.UI.createView({
		backgroundColor: 'rgba(' + _.random(0, 255) + ',' + _.random(0, 255) + ',' + _.random(0, 255) + ', 1.0)' // Generate rgba-color
	});

	$.scrollable.addView(newView);
	logger.log('Ti.UI.ScrollableView added new view at index ' + ($.scrollable.views.length - 1));

	validateButtons();
}

// eslint-disable-next-line no-unused-vars
function removeLastView() {
	$.scrollable.removeView($.scrollable.views[$.scrollable.views.length - 1]);
	logger.log('Ti.UI.ScrollableView deleted last view');

	validateButtons();
}

// eslint-disable-next-line no-unused-vars
function scrollableViewDidScroll(e) {
	logger.log('Ti.UI.ScrollableView did scroll to index ' + e.currentPage);
}

function validateButtons() {
	$.remove.setEnabled($.scrollable.views.length > 0);
	$.scrollTo.setEnabled($.scrollable.views.length >= 2);
}
