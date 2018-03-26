import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function stepperValueChanged({ value }) {
	$.state.setText(`The stepper value changed to ${value}`);
	logger.log(`Ti.UI.Stepper value changed to ${value}`);
}
