var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function textFieldValueChanged(e) {
	log.args('Ti.UI.TextField changed value to ' + e.value);
}

function textFieldFocussed(e) {
	log.args('Ti.UI.TextField focussed!');
}

function textFieldBlurred(e) {
	log.args('Ti.UI.TextField blurred!');
}
