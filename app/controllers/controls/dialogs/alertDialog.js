import { logger } from 'logger';

function onShowAlertDialog() {
	$.alert.show();
}

function onAlertDialogClicked(e) {
	$.resultLabel.text = `Selected button at index: ${e.index}`;
	logger.log(`Ti.UI.AlertDialog selected button at index: ${e.index}`);
}
