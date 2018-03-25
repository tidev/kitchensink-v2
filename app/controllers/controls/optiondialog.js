import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function showOptionDialog(e) {
	$.dialog.show();
}

// eslint-disable-next-line no-unused-vars
function optionDialogClicked({ index }) {
	alert(`Selected option at index: ${index}`);
	logger.log(`Ti.UI.OptionDialog selected option at index: ${index}`);
}
