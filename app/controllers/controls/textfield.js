import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

let focussedTextfield;

function textFieldValueChanged({ source, value }) {
	logger.log(`${source.id} changed value to ${value}`);
}

function textFieldFocussed({ source }) {
	focussedTextfield = source.id;
	logger.log(`${source.id} focussed!`);
}

function textFieldBlurred({ source }) {
	focussedTextfield = null;
	logger.log(`${source.id} blurred!`);
}

function blurTextfield() {
	if (focussedTextfield) {
		$[focussedTextfield].blur();
	}
}
