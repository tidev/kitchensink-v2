var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function textAreaValueChanged(e) {
	log.args('Ti.UI.TextArea changed value to ' + e.value);
}

function textAreaFocussed(e) {
	log.args('Ti.UI.TextArea focussed!');
}

function textAreaBlurred(e) {
	log.args('Ti.UI.TextArea blurred!');
}
