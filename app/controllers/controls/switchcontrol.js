import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function switchChanged({ value }) {
	$.state.setText(`The switch value changed to ${value}`);
	logger.log(`Ti.UI.Switch value changed to ${value}`);
}
