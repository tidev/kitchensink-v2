import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function showAlertDialog() {
	$.alert.show();
}

function alertDialogClicked({ index }) {
	alert(`Selected button at index: ${index}`);
	logger.log(`Ti.UI.AlertDialog selected button at index: ${index}`);
}
