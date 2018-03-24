import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function textAreaValueChanged(e) {
	logger.log('Ti.UI.TextArea changed value to ' + e.value);
}

function textAreaFocussed(e) {
	logger.log('Ti.UI.TextArea focussed!');
}

function textAreaBlurred(e) {
	logger.log('Ti.UI.TextArea blurred!');
}
