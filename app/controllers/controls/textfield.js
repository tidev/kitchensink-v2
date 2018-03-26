import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

let focussedTextfield;

// eslint-disable-next-line no-unused-vars
function textFieldValueChanged({ source, value }) {
	logger.log(`${source.id} changed value to ${value}`);
}

// eslint-disable-next-line no-unused-vars
function textFieldFocussed({ source }) {
	focussedTextfield = source.id;
	logger.log(`${source.id} focussed!`);
}

// eslint-disable-next-line no-unused-vars
function textFieldBlurred({ source }) {
	focussedTextfield = null;
	logger.log(`${source.id} blurred!`);
}

// eslint-disable-next-line no-unused-vars
function blurTextfield() {
	if (focussedTextfield) {
		$[focussedTextfield].blur();
	}
}
