var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function pickerValueChanged(e) {
	$.state.setText('Picker value changed to ' + e.selectedValue);
	log.args('Ti.UI.Picker changed value to: ' + e.selectedValue);
}
