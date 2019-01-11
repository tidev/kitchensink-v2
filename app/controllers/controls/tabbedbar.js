import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function tabbedBarSelectedIndex({ index }) {
	const message = `Ti.UI.TabbedBar changed to index: ${index}`;

	alert(message);
	logger.log(message);
}
