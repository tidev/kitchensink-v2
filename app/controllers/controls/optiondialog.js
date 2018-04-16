import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function showOptionDialog() {
	$.dialog.show();
}

function optionDialogClicked({ index }) {
	alert(`Selected option at index: ${index}`);
	logger.log(`Ti.UI.OptionDialog selected option at index: ${index}`);
}
