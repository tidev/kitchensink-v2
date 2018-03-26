import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function showAlertDialog(e) {
	$.alert.show();
}

// eslint-disable-next-line no-unused-vars
function alertDialogClicked({ index }) {
	alert(`Selected button at index: ${index}`);
	logger.log(`Ti.UI.AlertDialog selected button at index: ${index}`);
}
