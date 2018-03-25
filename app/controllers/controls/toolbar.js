import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function sayHello({ source }) {
	alert(`Hello from ${source.title}`);
	logger.log(`Ti.UI.Toolbar selected button with title: ${source.title}`);
}

// eslint-disable-next-line no-unused-vars
function showWindowWithToolbar() {
	const component = Alloy.createController('controls/toolbarAsActionBar').getView();
	Alloy.CFG.tabGroup.getActiveTab().open(component);
}
