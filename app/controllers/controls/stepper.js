import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function stepperValueChanged({ value }) {
	$.state.text = `The stepper value changed to ${value}`;
	logger.log(`Ti.UI.Stepper value changed to ${value}`);
}
