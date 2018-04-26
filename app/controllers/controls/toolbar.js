import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function sayHello({ source }) {
	alert(`Hello from ${source.title}`);
	logger.log(`Ti.UI.Toolbar selected button with title: ${source.title}`);
}
