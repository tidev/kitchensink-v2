import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function tabbedBarSelectedIndex({ index }) {
	const message = `Ti.UI.iOS.TabbedBar changed to index: ${index}`;

	alert(message);
	logger.log(message);
}
