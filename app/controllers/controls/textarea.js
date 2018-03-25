import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function textAreaValueChanged({ value }) {
	logger.log(`Ti.UI.TextArea changed value to ${value}`);
}

// eslint-disable-next-line no-unused-vars
function textAreaFocussed(e) {
	logger.log('Ti.UI.TextArea focussed!');
}

// eslint-disable-next-line no-unused-vars
function textAreaBlurred(e) {
	logger.log('Ti.UI.TextArea blurred!');
}
