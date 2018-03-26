import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function pickerValueChanged({ selectedValue }) {
	$.state.setText(`Picker value changed to ${selectedValue}`);
	logger.log(`Ti.UI.Picker changed value to: ${selectedValue}`);
}
