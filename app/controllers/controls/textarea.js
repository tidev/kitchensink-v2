import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function textAreaValueChanged({ value }) {
	logger.log(`Ti.UI.TextArea changed value to ${value}`);
}

function textAreaFocussed() {
	logger.log('Ti.UI.TextArea focussed!');
}

function textAreaBlurred() {
	logger.log('Ti.UI.TextArea blurred!');
}
