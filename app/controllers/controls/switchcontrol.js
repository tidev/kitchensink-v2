import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function switchChanged({ value }) {
	$.state.text = `The switch value changed to ${value}`;
	logger.log(`Ti.UI.Switch value changed to ${value}`);
}
